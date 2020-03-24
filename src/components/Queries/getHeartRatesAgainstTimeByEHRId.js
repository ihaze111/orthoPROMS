import CDRAQLQuery from "./CDRAQLQuery";

async function getHeartRatesAgainstTimeByEHRId(ehrId) {
    const aql = "select a_a/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value as heart_rate, a_a/data[at0002]/origin/value as time from EHR e contains COMPOSITION a contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.pulse.v1] where e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, (result) => {
        return result.resultSet ? result.resultSet : [];
    });
}

export default getHeartRatesAgainstTimeByEHRId;
