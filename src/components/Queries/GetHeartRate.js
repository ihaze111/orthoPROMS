import CDRAQLQuery from "./CDRAQLQuery";

async function getHeartRate(ehrId) {
    const aql = "select a_a/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value as heart_rate, a_a/data[at0002]/origin/value as time from EHR e contains COMPOSITION a contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.pulse.v1] where e/ehr_id/value='" + ehrId + "'";
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

export default getHeartRate;
