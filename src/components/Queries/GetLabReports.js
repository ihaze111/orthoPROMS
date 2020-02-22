import CDRAQLQuery from "./CDRAQLQuery";

async function getLabReports(ehrId) {
    const aql = "select a/composer/name as composer, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value/value as test, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0073]/value/value as test_status, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0075]/value/value as test_timestamp, b_b/items[at0002]/items[at0003]/value/value as comment, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0057]/value/value as conclusion from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.report-result.v1] contains ( OBSERVATION b_a[openEHR-EHR-OBSERVATION.laboratory_test.v0] and CLUSTER b_b[openEHR-EHR-CLUSTER.laboratory_test_panel.v0]) where a/name/value='Laboratory test report' and e/ehr_id/value='" + ehrId + "'";
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

export default getLabReports;