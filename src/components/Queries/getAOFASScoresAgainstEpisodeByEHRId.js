import CDRAQLQuery, { QueryResultCallbackProcessing } from "./CDRAQLQuery";

async function getAOFASScoresAgainstEpisodeByEHRId(ehrId) {
    const aql = "select\n" +
        "    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0028]/value/value as pain,\n" +
        "    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0033]/value/value as limitations,\n" +
        "    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0038]/value/value as walking,\n" +
        "    a_b/data[at0001]/events[at0002]/data[at0003]/items[at0043]/value/value as walking_surfaces,\n" +
        "    a_a/items[at0001]/value/value as episode_identifier\n" +
        "from EHR e\n" +
        "contains COMPOSITION a\n" +
        "contains (\n" +
        "    CLUSTER a_a[openEHR-EHR-CLUSTER.episode_details_northproms.v0] and\n" +
        "    OBSERVATION a_b[openEHR-EHR-OBSERVATION.aofas.v0])\n" +
        "where e/ehr_id/value='"+ ehrId +"'";
    return await CDRAQLQuery(aql, QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray);
}

export default getAOFASScoresAgainstEpisodeByEHRId;
