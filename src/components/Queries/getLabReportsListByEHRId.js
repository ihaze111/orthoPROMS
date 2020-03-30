import CDRAQLQuery, { QueryResultCallbackProcessing } from "./CDRAQLQuery";

export const labReportsCallbackProcessing = (result) => {
    /**
    * Make datetimes in the resultSet more human readable and then return the result set
    * @param result
    * @returns {*|QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray.props.resultSet|[]}
    */
    for(var i = 0; i < result.resultSet.length ; i++){
        if (result.resultSet[i].test_timestamp !== null){
            result.resultSet[i].test_timestamp = formatTime(result.resultSet[i].test_timestamp);
        }
    }
    return QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(result);
};

async function getLabReportsListByEHRId(ehrId) {
    /**
    * Get a list of all lab reports associated with the given EHR
    * @param ehrId
    * @returns {Promise<*>}
    */
    const aql = "select a/composer/name as composer, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value/value as test, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0075]/value/value as test_timestamp, b_b/items[at0002]/items[at0003]/value/value as comment, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0057]/value/value as conclusion from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.report-result.v1] contains ( OBSERVATION b_a[openEHR-EHR-OBSERVATION.laboratory_test.v0] and CLUSTER b_b[openEHR-EHR-CLUSTER.laboratory_test_panel.v0]) where a/name/value='Laboratory test report' and e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, labReportsCallbackProcessing);
}

export function formatTime(time){
    /**
     * If time is in format returned from CDR, then make more human readable by removing T and milliseconds. Otherwise
     * leave alone generally.
     * @param time
     * @returns {string}
    */
    return time.indexOf('.') !== -1 ? time.replace(/T/, ' ').substring(0, time.indexOf('.')) : time.replace(/T/, ' ');
}

export default getLabReportsListByEHRId;
