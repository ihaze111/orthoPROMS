import CDRAQLQuery from "./CDRAQLQuery";

async function getProcedures(ehrId) {
    const aql = "select a_a/description[at0001]/items[at0002]/value/value as procedure_name, a_a/description[at0001]/items[at0049]/value/value as notes, a_a/time/value as time, a/composer/name as name, a_a/ism_transition/careflow_step/value as careflow_step, a_a/ism_transition/current_state/value as current_state from EHR e contains COMPOSITION a contains ACTION a_a[openEHR-EHR-ACTION.procedure.v1] where e/ehr_id/value='" + ehrId + "'";
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

export default getProcedures;