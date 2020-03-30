import CDRAQLQuery, { QueryResultCallbackProcessing } from './CDRAQLQuery';

function timeFormat(time) {
  const newTime = time.replace(/T/, ' ').substring(0, time.indexOf('.'));
  return newTime;
}

async function getProceduresListByEHRId(ehrId) {
  const aql = `select a_a/description[at0001]/items[at0002]/value/value as procedure_name, a_a/description[at0001]/items[at0049]/value/value as notes, a_a/time/value as time, a/composer/name as name, a_a/ism_transition/careflow_step/value as careflow_step from EHR e contains COMPOSITION a contains ACTION a_a[openEHR-EHR-ACTION.procedure.v1] where e/ehr_id/value='${ehrId}'`;
  return CDRAQLQuery(aql, (result) => {
    const newResult = result;
    for (let i = 0; i < newResult.resultSet.length; i += 1) {
      if (newResult.resultSet[i].time !== null) {
        newResult.resultSet[i].time = timeFormat(newResult.resultSet[i].time);
      }
    }
    return QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(newResult);
  });
}

export default getProceduresListByEHRId;
