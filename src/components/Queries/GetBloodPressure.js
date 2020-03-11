import CDRAQLQuery from "./CDRAQLQuery";

async function getBloodPressure(ehrId) {
    const aql = "select a_a/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value as systolic, a_a/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value as diastolic, a_a/data[at0001]/origin/value as time from EHR e contains COMPOSITION a contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.blood_pressure.v1] where e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, (result) => {
        return result.resultSet ? result.resultSet : [];
    });
}

export default getBloodPressure;
