import CDRAQLQuery, { QueryResultCallbackProcessing } from "./CDRAQLQuery";

/**
 * Get a list of all compositions relating to an EHR id, for display in a table, containing:
 * - Composition id
 * - NHS Number
 * - Composer Name
 * - Episode identifier (e.g. 'One week post-op')
 * - Comment
 * @param ehrId EHR id of patient
 * @returns {Promise<*>} A promise that will return the result in JSON, as processed by the callback function
 * (currently no processing)
 */
async function getAllCompositionsByEHRId(ehrId) {
    const aql = "select a/uid/value as comp_id, e/ehr_status/subject/external_ref/id/value as nhs_number," +
        " a/composer/name as composer_name, b_b/items[at0001]/value/value as episode_identifier," +
        " b_a/data[at0001]/events[at0002]/data[at0003]/items[at0027]/value/value as aofas_comment from EHR e" +
        " contains COMPOSITION a[openEHR-EHR-COMPOSITION.report.v1] contains ( OBSERVATION" +
        " b_a[openEHR-EHR-OBSERVATION.aofas.v0] and CLUSTER b_b[openEHR-EHR-CLUSTER.episode_details_northproms.v0])" +
        " where a/name/value='UCLH Foot and ankle PROMs' and e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray);
}

export default getAllCompositionsByEHRId;
