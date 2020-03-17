import CDRAQLQuery from "./CDRAQLQuery";

async function getProcedures(ehrId) {
    const aql = "select a_a/description[at0001]/items[at0002]/value/value as procedure_name, a_a/description[at0001]/items[at0049]/value/value as notes, a_a/time/value as time, a/composer/name as name, a_a/ism_transition/careflow_step/value as careflow_step from EHR e contains COMPOSITION a contains ACTION a_a[openEHR-EHR-ACTION.procedure.v1] where e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, (result) => {
        for(var i = 0; i < result.resultSet.length ; i++){
            if (result.resultSet[i].time !== null){
                result.resultSet[i].time = timeFormat(result.resultSet[i].time);
            }
        }
        return result.resultSet ? result.resultSet : [];
    });
}

function timeFormat(time){
    var newTime = time.replace(/T/, ' ').substring(0, time.indexOf('.'));
    return newTime;
}

export default getProcedures;
