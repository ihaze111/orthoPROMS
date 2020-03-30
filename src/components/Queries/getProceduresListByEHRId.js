import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';

export const proceduresCallbackProcessing = (result) => {
  /**
   * Make datetimes in the resultSet more human readable and then return the result set
   * @param result
   * @returns {*|QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray.props.resultSet|[]}
   */
  for (let i = 0; i < result.resultSet.length; i++) {
    if (result.resultSet[i].time !== null) {
      result.resultSet[i].time = timeFormat(result.resultSet[i].time);
    }
  }
  return QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(result);
};

async function getProceduresListByEHRId(ehrId) {
  /**
   * Get a list of all allergies associated with the given EHR
   * @param ehrId
   * @returns {Promise<*>}
   */
  const aql = `select a_a/description[at0001]/items[at0002]/value/value as procedure_name, a_a/description[at0001]/items[at0049]/value/value as notes, a_a/time/value as time, a/composer/name as name, a_a/ism_transition/careflow_step/value as careflow_step from EHR e contains COMPOSITION a contains ACTION a_a[openEHR-EHR-ACTION.procedure.v1] where e/ehr_id/value='${ehrId}'`;
  return CDRAQLQuery(aql, proceduresCallbackProcessing);
}

export function timeFormat(time) {
  /**
   * If time is in format returned from CDR, then make more human readable by removing T and
   * milliseconds. Otherwise leave alone generally.
   * @returns {string}
   */
  return time.indexOf('.') !== -1 ? time.replace(/T/, ' ')
    .substring(0, time.indexOf('.')) : time.replace(/T/, ' ');
}

export default getProceduresListByEHRId;
