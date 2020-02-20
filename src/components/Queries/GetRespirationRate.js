import CDRAQLQuery from "./CDRAQLQuery";

async function getRespirationRate(ehrId) {
    const aql = "select a_a/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value as respiration_rate, a_a/data[at0001]/origin/value as time from EHR e contains COMPOSITION a contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.respiration.v1] where e/ehr_id/value='" + ehrId + "'";
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

export default getRespirationRate;

