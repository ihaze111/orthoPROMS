import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';
import { formatTime } from './queryProcessingHelpers';

/**
 * Make datetimes in the resultSet more human readable and then return the result set
 * @param result
 * @returns {*}
 */
export const labReportsCallbackProcessing = (result) => {
  const newResult = result;
  for (let i = 0; i < newResult.resultSet.length; i += 1) {
    if (newResult.resultSet[i].test_timestamp !== null) {
      newResult.resultSet[i].test_timestamp = formatTime(newResult.resultSet[i].test_timestamp);
    }
  }
  return QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(newResult);
};

/**
 * Get a list of all lab reports associated with the given EHR
 * @param ehrId
 * @returns {Promise<*>}
 */
async function getLabReportsListByEHRId(ehrId) {
  const aql = `select a/composer/name as composer, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value/value as test, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0075]/value/value as test_timestamp, b_b/items[at0002]/items[at0003]/value/value as comment, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0057]/value/value as conclusion from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.report-result.v1] contains ( OBSERVATION b_a[openEHR-EHR-OBSERVATION.laboratory_test.v0] and CLUSTER b_b[openEHR-EHR-CLUSTER.laboratory_test_panel.v0]) where a/name/value='Laboratory test report' and e/ehr_id/value='${ehrId}'`;
  return CDRAQLQuery(aql, labReportsCallbackProcessing);
}

export default getLabReportsListByEHRId;
