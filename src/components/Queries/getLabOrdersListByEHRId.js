import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';

/**
 * If time is in format returned from CDR, then make more human readable by removing T and
 * milliseconds. Otherwise leave alone generally.
 * @param timing
 * @returns {string}
 */
export function formatTiming(timing) {
  return timing.indexOf('+') !== -1 ? timing.replace(/T/, ' ')
    .substring(3, timing.indexOf('+')) : timing.replace(/T/, ' ');
}

/**
 * If time is in format returned from CDR, then make more human readable by removing T and
 * milliseconds. Otherwise leave alone generally.
 * @param time
 * @returns {string}
 */
export function formatContextTime(time) {
  return time.indexOf('.') !== -1 ? time.replace(/T/, ' ')
    .substring(0, time.indexOf('.')) : time.replace(/T/, ' ');
}

/**
 * Make datetimes in the resultSet more human readable and then return the result set
 * @param result
 * @returns {*}
 */
export const labOrdersCallbackProcessing = (result) => {
  const newResult = result;
  for (let i = 0; i < newResult.resultSet.length; i += 1) {
    if (newResult.resultSet[i].timing !== null) {
      newResult.resultSet[i].timing = formatTiming(newResult.resultSet[i].timing);
    }
  }
  for (let i = 0; i < newResult.resultSet.length; i += 1) {
    if (newResult.resultSet[i].context_time !== null) {
      newResult.resultSet[i].context_time = formatContextTime(newResult.resultSet[i].context_time);
    }
  }
  return QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(newResult);
};

async function getLabOrdersListByEHRId(ehrId) {
  /**
   * Get a list of all lab reports associated with the given EHR
   * @param ehrId
   * @returns {Promise<*>}
   */
  const aql = `select a/composer/name as composer, b_a/activities[at0001]/description[at0009]/items[at0121]/value/value as request, b_a/activities[at0001]/timing/value as timing, a/context/start_time/value as context_time from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.referral.v0] contains ( INSTRUCTION b_a[openEHR-EHR-INSTRUCTION.request-lab_test.v1] and ACTION b_b[openEHR-EHR-ACTION.laboratory_test.v1]) where a/name/value='Laboratory order' and e/ehr_id/value='${ehrId}'`;
  return CDRAQLQuery(aql, labOrdersCallbackProcessing);
}

export default getLabOrdersListByEHRId;
