import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';

async function getRespirationRateAgainstTimeByEHRId(ehrId) {
  const aql = `select a/uid/value as comp_id, a_a/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value as respiration_rate, a_a/data[at0001]/origin/value as time from EHR e contains COMPOSITION a contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.respiration.v1] where e/ehr_id/value='${ehrId}'`;
  return CDRAQLQuery(aql, QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray);
}

export default getRespirationRateAgainstTimeByEHRId;
