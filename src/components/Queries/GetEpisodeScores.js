import CDRAQLQuery from "./CDRAQLQuery";

async function getEpisodeScores(ehrId) {
    const aql = "select a_b/data[at0001]/events[at0002]/data[at0003]/items[at0028]/value/value as pain, a_b/data[at0001]/events[at0002]/data[at0003]/items[at0033]/value/value as limitations, a_b/data[at0001]/events[at0002]/data[at0003]/items[at0038]/value/value as walking, a_b/data[at0001]/events[at0002]/data[at0003]/items[at0043]/value/value as walking_surfaces from EHR e contains COMPOSITION a contains ( CLUSTER a_a[openEHR-EHR-CLUSTER.episode_details_northproms.v0] and OBSERVATION a_b[openEHR-EHR-OBSERVATION.aofas.v0]) where e/ehr_id/value='"+ ehrId +"'";
    return await CDRAQLQuery(aql, (result) => {
        return result.resultSet ? result.resultSet : [];
    });
}

export default getEpisodeScores;
