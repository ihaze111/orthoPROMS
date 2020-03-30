import CDRAQLQuery from './CDRAQLQuery';

async function getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs() {
  const aql = 'select\n'
    + '    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0028]/value/value as pain,\n'
    + '    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0033]/value/value as limitations,\n'
    + '    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0038]/value/value as walking,\n'
    + '    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0043]/value/value as walking_surfaces,\n'
    + '    a_a/items[at0001]/value as episode_identifier\n'
    + 'from EHR e\n'
    + 'contains COMPOSITION a\n'
    + 'contains (\n'
    + '    CLUSTER a_a[openEHR-EHR-CLUSTER.episode_details_northproms.v0] and\n'
    + '    OBSERVATION a_b[openEHR-EHR-OBSERVATION.aofas.v0])';
  return CDRAQLQuery(aql, (result) => {
    if (result.resultSet) {
      const episodeTimeList = {};
      result.resultSet.forEach((e) => {
        if (!(e.episode_identifier.value in episodeTimeList)) {
          episodeTimeList[e.episode_identifier.value] = [e];
        } else {
          episodeTimeList[e.episode_identifier.value].push(e);
        }
      });
      const lengths = {};
      Object.keys(episodeTimeList)
        .forEach((e) => {
          lengths[e] = episodeTimeList[e].length;
        });
      const resultWithKey = {};
      Object.keys(episodeTimeList)
        .forEach((key) => {
          const subResult = {};
          const sums = episodeTimeList[key].reduce((accumulator, currentValue) => {
            const returnObject = {};
            Object.keys(currentValue)
              .forEach((objectVal) => {
                returnObject[objectVal] = accumulator[objectVal] + currentValue[objectVal];
              });
            return returnObject;
          });
          Object.keys(sums)
            .forEach((key1) => {
              subResult[key1] = sums[key1] / lengths[key];
            });
          const episodeIdentifierToSimpleKey = {
            '1 week post-operative': 'oneWeek',
            'Pre-operative': 'preOp',
            '6 weeks post-operative': 'sixWeeks',
          };
          resultWithKey[episodeIdentifierToSimpleKey[key]] = [
            subResult.pain,
            subResult.limitations,
            subResult.walking,
            subResult.walking_surfaces,
          ];
        });
      return (resultWithKey);
    }
    return [];
  });
}

export default getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs;
