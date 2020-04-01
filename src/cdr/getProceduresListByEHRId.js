import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';

/**
 * If time is in format returned from CDR, then make more human readable by removing T and
 * milliseconds. Otherwise leave alone generally.
 * @returns {string}
 */
export function timeFormat(time) {
  return time.indexOf('.') !== -1 ? time.replace(/T/, ' ')
    .substring(0, time.indexOf('.')) : time.replace(/T/, ' ');
}

/**
 * Make datetimes in the resultSet more human readable and then return the result set
 * @param result
 * @returns {*}
 */
export const proceduresCallbackProcessing = (result) => {
  const newResult = result;
  for (let i = 0; i < newResult.resultSet.length; i += 1) {
    if (newResult.resultSet[i].time !== null) {
      newResult.resultSet[i].time = timeFormat(result.resultSet[i].time);
    }
  }
  return QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(newResult);
};

/**
 * Get a list of all allergies associated with the given EHR
 * @param ehrId
 * @returns {Promise<*>}
 */
async function getProceduresListByEHRId(ehrId) {
  const aql = `${'select\n'
    + '    a_a/description[at0001]/items[at0002]/value/value as procedure_name,\n'
    + '    a_a/description[at0001]/items[at0049]/value/value as notes,\n'
    + '    a_a/time/value as time,\n'
    + '    a/composer/name as name,\n'
    + '    a_a/ism_transition[at0034]/careflow_step/value as careflow_step\n'
    + 'from EHR e\n'
    + 'contains COMPOSITION a\n'
    + 'contains ACTION a_a[openEHR-EHR-ACTION.procedure.v1]\n'
    + 'where e/ehr_id/value=\''}${ehrId}'`;
  return CDRAQLQuery(aql, proceduresCallbackProcessing);
}

export default getProceduresListByEHRId;
