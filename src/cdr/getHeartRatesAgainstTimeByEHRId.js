import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';

/**
 * Get the heart rate measurements for a particular patient by time
 * @param ehrId
 * @returns {Promise<*>}
 */
async function getHeartRatesAgainstTimeByEHRId(ehrId) {
  const aql = `${'select\n'
    + '    a/uid/value as comp_id,\n'
    + '    a_a/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value as heart_rate,\n'
    + '    a_a/data[at0002]/origin/value as time\n'
    + 'from EHR e\n'
    + 'contains COMPOSITION a\n'
    + 'contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.pulse.v1]'
    + 'where e/ehr_id/value=\''}${ehrId}'`;
  return CDRAQLQuery(aql, QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray);
}

export default getHeartRatesAgainstTimeByEHRId;
