import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';

/**
 * Get the indirect oximetry measurements for a particular patient by time
 * @param ehrId
 * @returns {Promise<*>}
 */
async function getIndirectOximetryAgainstTimeByEHRId(ehrId) {
  const aql = `${'select\n'
    + '    a/uid/value as comp_id,\n'
    + '    a_a/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value/numerator as numerator,\n'
    + '    a_a/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value/denominator as denominator,\n'
    + '    a_a/data[at0001]/origin/value as time\n'
    + 'from EHR e\n'
    + 'contains COMPOSITION a\n'
    + 'contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.indirect_oximetry.v1]\n'
    + 'where e/ehr_id/value=\''}${ehrId}'`;
  return CDRAQLQuery(aql, QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray);
}

export default getIndirectOximetryAgainstTimeByEHRId;
