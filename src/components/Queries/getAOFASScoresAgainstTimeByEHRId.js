import CDRAQLQuery, { QueryResultCallbackProcessing } from "./CDRAQLQuery";

async function getAOFASScoresAgainstTimeByEHRId(ehrId) {
    const aql = "select\n" +
        "    a/uid/value as comp_id,\n" +
        "    a_a/data[at0001]/events[at0002]/data[at0003]/items[at0028]/value/value as pain,\n" +
        "    a_a/data[at0001]/events[at0002]/data[at0003]/items[at0033]/value/value as limitations,\n" +
        "    a_a/data[at0001]/events[at0002]/data[at0003]/items[at0038]/value/value as walking,\n" +
        "    a_a/data[at0001]/events[at0002]/data[at0003]/items[at0043]/value/value as walking_surfaces,\n" +
        "    a_a/data[at0001]/events[at0002]/data[at0003]/items[at0008]/value/magnitude as total,\n" +
        "    a_a/data[at0001]/events[at0002]/time/value as reg_time\n" +
        "from EHR e\n" +
        "contains COMPOSITION a\n" +
        "contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.aofas.v0] where e/ehr_id/value='"+ ehrId +"'";
    return await CDRAQLQuery(aql, QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray);
}

export default getAOFASScoresAgainstTimeByEHRId;

