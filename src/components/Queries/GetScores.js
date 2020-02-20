import CDRAQLQuery from "./CDRAQLQuery";

async function getScores(ehrId) {
    const aql = "select a_a/data[at0001]/events[at0002]/data[at0003]/items[at0028]/value/value as pain, a_a/data[at0001]/events[at0002]/data[at0003]/items[at0033]/value/value as limitations, a_a/data[at0001]/events[at0002]/data[at0003]/items[at0038]/value/value as walking, a_a/data[at0001]/events[at0002]/data[at0003]/items[at0043]/value/value as walking_surfaces, a_a/data[at0001]/events[at0002]/data[at0003]/items[at0008]/value/magnitude as total, a_a/data[at0001]/events[at0002]/time/value as reg_time from EHR e contains COMPOSITION a contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.aofas.v0] where e/ehr_id/value='"+ ehrId +"'";
    return await CDRAQLQuery(aql, (result) => {
        if (result.resultSet) {
            return result.resultSet.map((e) => {
                return e;
            });
        } else {
            return [];
        }
    });
}

export default getScores;

