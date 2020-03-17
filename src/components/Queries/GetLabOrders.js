import CDRAQLQuery from "./CDRAQLQuery";

async function getLabOrders(ehrId) {
    const aql = "select a/composer/name as composer, b_a/activities[at0001]/description[at0009]/items[at0121]/value/value as request, b_a/activities[at0001]/timing/value as timing, a/context/start_time/value as context_time from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.referral.v0] contains ( INSTRUCTION b_a[openEHR-EHR-INSTRUCTION.request-lab_test.v1] and ACTION b_b[openEHR-EHR-ACTION.laboratory_test.v1]) where a/name/value='Laboratory order' and e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, (result) => {
        for(var i = 0; i < result.resultSet.length ; i++){
            if (result.resultSet[i].timing !== null){
                result.resultSet[i].timing = formatTiming(result.resultSet[i].timing);
            }
        }
        for(var i = 0; i < result.resultSet.length ; i++){
            if (result.resultSet[i].context_time !== null){
                result.resultSet[i].context_time = formatContextTime(result.resultSet[i].context_time);
            }
        }
        return result.resultSet ? result.resultSet : [];
    });
}

function formatTiming(timing){
    var newTiming = timing.replace(/T/, ' ').substring(3,timing.indexOf('+'));
    return newTiming;
}

function formatContextTime(time){
    var newTime = time.replace(/T/, ' ').substring(0,time.indexOf('.'));
    return newTime;
}

export default getLabOrders;
