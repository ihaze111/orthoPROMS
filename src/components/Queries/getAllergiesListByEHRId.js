import CDRAQLQuery from "./CDRAQLQuery";

async function getAllergiesListByEHRId(ehrId) {
    const aql = "select a_a/data[at0001]/items[at0025]/items[at0004]/value/value as reaction, a_a/data[at0001]/items[at0025]/items[at0022]/value/value as comment, a_a/data[at0001]/items[at0002]/value/value as cause, a_b/data[at0001]/items[at0002.1]/value/value as exclusion, a_b/protocol[at0006]/items[at0004]/value/value as update_exclusion_date, a/composer/name as composer from EHR e contains COMPOSITION a contains ( EVALUATION a_a[openEHR-EHR-EVALUATION.adverse_reaction_uk.v1] or EVALUATION a_b[openEHR-EHR-EVALUATION.exclusion-adverse_reaction.v1]) where e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, (result) => {
        for(let i = 0; i < result.resultSet.length ; i++){
            if (result.resultSet[i].update_exclusion_date !== null){
                result.resultSet[i].update_exclusion_date = timeFormat(result.resultSet[i].update_exclusion_date);
            }
        }
        return result.resultSet ? result.resultSet : [];
    });
}

function timeFormat(time){
    return time.replace(/T/, ' ').substring(0, time.indexOf('.'));
}

export default getAllergiesListByEHRId;
