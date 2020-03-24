import CDRAQLQuery from "./CDRAQLQuery";

async function getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs() {
    const aql = "select\n" +
        "    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0028]/value/value as pain,\n" +
        "    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0033]/value/value as limitations,\n" +
        "    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0038]/value/value as walking,\n" +
        "    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0043]/value/value as walking_surfaces,\n" +
        "    a_a/items[at0001]/value as episode_identifier\n" +
        "from EHR e\n" +
        "contains COMPOSITION a\n" +
        "contains (\n" +
        "    CLUSTER a_a[openEHR-EHR-CLUSTER.episode_details_northproms.v0] and\n" +
        "    OBSERVATION a_b[openEHR-EHR-OBSERVATION.aofas.v0])";
    return await CDRAQLQuery(aql, (result) => {
        if (result.resultSet) {
            // return result.resultSet.map((e) => {
            //     return e;
            // });
            const episode_time_list = {};
            result.resultSet.map((e) => {
                if (!(e.episode_identifier.value in episode_time_list)) {
                    episode_time_list[e.episode_identifier.value] = [e];
                } else {
                    episode_time_list[e.episode_identifier.value].push(e);
                }
            });
            const lengths = {};
            Object.keys(episode_time_list).map((e) => { lengths[e] = episode_time_list[e].length});
            const resultWithKey = {};
            Object.keys(episode_time_list).map((key) => {
                const result = {};
                const sums = episode_time_list[key].reduce((accumulator, currentValue) => {
                    const returnObject = {};
                    Object.keys(currentValue).map((objectVal) => {
                        returnObject[objectVal] = accumulator[objectVal] + currentValue[objectVal];
                    });
                    return returnObject;
                });
                Object.keys(sums).map((key1) => {
                    result[key1] = sums[key1] / lengths[key];
                });
                if (key === "1 week post-operative") {
                    resultWithKey["oneWeek"] = [result.pain, result.limitations, result.walking, result.walking_surfaces];
                } else if (key === "Pre-operative") {
                    resultWithKey["preOp"] = [result.pain, result.limitations, result.walking, result.walking_surfaces];
                } else if (key === "6 weeks post-operative") {
                    resultWithKey["sixWeeks"] = [result.pain, result.limitations, result.walking, result.walking_surfaces];
                }
            });
            return(resultWithKey);
        } else {
            return [];
        }
    });
}

export default getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs;
