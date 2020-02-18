import CDRAQLQuery from "./CDRAQLQuery";

async function getAllergicList(ehrId) {
    const aql = "select a_a/data[at0001]/items[at0025]/items[at0004]/value/value as reaction, a_a/data[at0001]/items[at0025]/items[at0022]/value/value as comment, a_a/data[at0001]/items[at0002]/value/value as cause, a_b/data[at0001]/items[at0002.1]/value/value as exclusion, a_b/protocol[at0006]/items[at0004]/value/value as update_exclusion_date from EHR e contains COMPOSITION a contains ( EVALUATION a_a[openEHR-EHR-EVALUATION.adverse_reaction_uk.v1] or EVALUATION a_b[openEHR-EHR-EVALUATION.exclusion-adverse_reaction.v1]) where e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, (result) => {
        if (result.resultSet) {
            return result.resultSet.map((e) => {
                return e;
            });
        } else {
            return [];
        }
    });
}

export default getAllergicList;