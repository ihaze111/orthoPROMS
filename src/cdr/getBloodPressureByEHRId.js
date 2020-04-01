import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';

/**
 * Get blood pressure (both systolic and diastolic) for a particular patient by time
 * @param ehrId
 * @returns {Promise<*>}
 */
async function getBloodPressureByEHRId(ehrId) {
  const aql = `${'select\n'
    + '    a/uid/value as comp_id,\n'
    + '    a_a/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value as systolic,\n'
    + '    a_a/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value as diastolic,\n'
    + '    a_a/data[at0001]/origin/value as time\n'
    + 'from EHR e\n'
    + 'contains COMPOSITION a\n'
    + 'contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.blood_pressure.v1]\n'
    + 'where e/ehr_id/value=\''}${ehrId}'`;
  return CDRAQLQuery(aql, QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray);
}

export default getBloodPressureByEHRId;
