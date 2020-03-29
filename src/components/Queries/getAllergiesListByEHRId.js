import CDRAQLQuery, { QueryResultCallbackProcessing } from "./CDRAQLQuery";

/**
 * Make datetimes in the resultSet more human readable and then return the result set
 * @param result
 * @returns {*|QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray.props.resultSet|[]}
 */
export const allergiesCallbackProcessing = (result) => {
    for (let i = 0; i < result.resultSet.length; i++) {
        if (result.resultSet[i].update_exclusion_date !== null) {
            result.resultSet[i].update_exclusion_date = timeFormat(result.resultSet[i].update_exclusion_date);
        }
    }
    return QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(result);
};

/**
 * Get a list of all allergies associated with the given EHR
 * @param ehrId
 * @returns {Promise<*>}
 */
async function getAllergiesListByEHRId(ehrId) {
    const aql = "select\n" +
        "    a_a/data[at0001]/items[at0025]/items[at0004]/value/value as reaction,\n" +
        "    a_a/data[at0001]/items[at0025]/items[at0022]/value/value as comment,\n" +
        "    a_a/data[at0001]/items[at0002]/value/value as cause,\n" +
        "    a_b/data[at0001]/items[at0002.1]/value/value as exclusion,\n" +
        "    a_b/protocol[at0006]/items[at0004]/value/value as update_exclusion_date,\n" +
        "    a/composer/name as composer\n" +
        "from EHR e\n" +
        "contains COMPOSITION a\n" +
        "contains (\n" +
        "    EVALUATION a_a[openEHR-EHR-EVALUATION.adverse_reaction_uk.v1] or\n" +
        "    EVALUATION a_b[openEHR-EHR-EVALUATION.exclusion-adverse_reaction.v1]) where e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, allergiesCallbackProcessing);
}

/**
 * If time is in format returned from CDR, then make more human readable by removing T and milliseconds. Otherwise
 * leave alone generally.
 * @param time
 * @returns {string}
 */
export function timeFormat(time) {
    return time.indexOf('.') !== -1 ? time.replace(/T/, ' ').substring(0, time.indexOf('.')) : time.replace(/T/, ' ');
}

export default getAllergiesListByEHRId;
