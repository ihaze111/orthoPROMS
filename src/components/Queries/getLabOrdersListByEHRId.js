import CDRAQLQuery, { QueryResultCallbackProcessing } from "./CDRAQLQuery";

export const labOrdersCallbackProcessing = (result) => {
    /**
    * Make datetimes in the resultSet more human readable and then return the result set
    * @param result
    * @returns {*|QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray.props.resultSet|[]}
    */
    for(let i = 0; i < result.resultSet.length ; i++){
        if (result.resultSet[i].timing !== null){
            result.resultSet[i].timing = formatTiming(result.resultSet[i].timing);
        }
    }
    for(let i = 0; i < result.resultSet.length ; i++){
        if (result.resultSet[i].context_time !== null){
            result.resultSet[i].context_time = formatContextTime(result.resultSet[i].context_time);
        }
    }
    return QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(result);
};

async function getLabOrdersListByEHRId(ehrId) {
    /**
    * Get a list of all lab reports associated with the given EHR
    * @param ehrId
    * @returns {Promise<*>}
    */
    const aql = "select a/composer/name as composer, b_a/activities[at0001]/description[at0009]/items[at0121]/value/value as request, b_a/activities[at0001]/timing/value as timing, a/context/start_time/value as context_time from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.referral.v0] contains ( INSTRUCTION b_a[openEHR-EHR-INSTRUCTION.request-lab_test.v1] and ACTION b_b[openEHR-EHR-ACTION.laboratory_test.v1]) where a/name/value='Laboratory order' and e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, labOrdersCallbackProcessing);
}

function formatTiming(timing){
    /**
     * If time is in format returned from CDR, then make more human readable by removing T and milliseconds. Otherwise
     * leave alone generally.
     * @param timing
     * @returns {string}
    */
   return timing.indexOf('+') !== -1 ? timing.replace(/T/, ' ').substring(3, timing.indexOf('+')) : timing.replace(/T/, ' ');
}

function formatContextTime(time){
    /**
     * If time is in format returned from CDR, then make more human readable by removing T and milliseconds. Otherwise
     * leave alone generally.
     * @param time
     * @returns {string}
    */
   return time.indexOf('.') !== -1 ? time.replace(/T/, ' ').substring(0, time.indexOf('.')) : time.replace(/T/, ' ');
}

export default getLabOrdersListByEHRId;
