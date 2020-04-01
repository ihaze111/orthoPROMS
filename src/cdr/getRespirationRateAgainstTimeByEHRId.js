import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';

/**
 * Get respiration rate measurements for a patient by time
 * @param ehrId
 * @returns {Promise<*>}
 */
async function getRespirationRateAgainstTimeByEHRId(ehrId) {
  const aql = `${'select\n'
    + '    a/uid/value as comp_id,\n'
    + '    a_a/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value as respiration_rate,\n'
    + '    a_a/data[at0001]/origin/value as time\n'
    + 'from EHR e\n'
    + 'contains COMPOSITION a\n'
    + 'contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.respiration.v1]\n'
    + 'where e/ehr_id/value=\''}${ehrId}'`;
  return CDRAQLQuery(aql, QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray);
}

export default getRespirationRateAgainstTimeByEHRId;
