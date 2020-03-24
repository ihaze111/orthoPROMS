import CDRAQLQuery from "./CDRAQLQuery";

/**
 * Return simplified JSON regarding anonymous data about the patient
 * Uses specification of anonymized patient archetype: https://ckm.openehr.org/ckm/archetypes/1013.1.1745
 * @param tree
 * @returns {{gender: string, birthYear: string, sex: string, vitalStatus: string}}
 */
function processOtherDetails(tree) {
    let processedResult = {
        gender: '',
        sex: '',
        vitalStatus: '',
        birthYear: ''
    };
    if (tree === null) return processedResult;
    if (tree['@class'] === 'ITEM_TREE' && 'items' in tree) {
        const treeItem = tree.items[0];
        if (treeItem.archetype_node_id === 'openEHR-EHR-CLUSTER.person_anonymised_parent.v1') {
            treeItem.items.forEach((item) => {
                switch (item.archetype_node_id) {
                    case 'at0001':
                        processedResult.gender = item.value.value;
                        break;
                    case 'at0002':
                        processedResult.sex = item.value.value;
                        break;
                    case 'at0003':
                        processedResult.vitalStatus = item.value.value;
                        break;
                    case 'at0014':
                        processedResult.birthYear = item.value.value;
                        break;
                    default:
                        break;
                }
            });
        }
    }
    return processedResult;
}

/**
 * Simplify the JSON in the result of the EHR call
 * @param result
 * @returns {*}
 */
function callbackProcessing(result) {
    return result.resultSet.map((e) => {
        let final = {};
        if ('other_details' in e) {
            final = processOtherDetails(e.other_details);
        }
        final.patientId = e.ehr_id.value || "";
        if ('nhsNumber' in e) {
            final.subjectId = e.nhsNumber ? e.nhsNumber.value : "";
            final.nhsNumber = e.nhsNumber ? e.nhsNumber.value : "";
        }
        return final;
    });
}

/**
 * Get a list every EHR in the CDR that has an NHS number associated with it, for display in a table, containing:
 * - EHR id
 * - Other details (anonymized data), which are simplified into
 *      - Administrative Gender
 *      - Birth Sex
 *      - Vital Status
 *      - Birth Year
 * - NHS Number
 * - Time created
 * @returns {Promise<*>} A promise which will return a JSON list of the
 * EHRs, as processed in callbackProcessing
 */
async function getAllEHRsInCDR() {
    const aql = "select e/ehr_id as ehr_id, e/ehr_status/other_details as\n" +
        "         other_details,\n" +
        "         e/ehr_status/subject/external_ref/id as nhsNumber, e/time_created as time_created from ehr e where e/ehr_status/subject/external_ref/namespace = 'uk.nhs.nhs_number'";
    return await CDRAQLQuery(aql, callbackProcessing);
}

export default getAllEHRsInCDR;
