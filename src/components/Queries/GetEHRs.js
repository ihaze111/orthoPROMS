import CDRAQLQuery from "./CDRAQLQuery";

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

async function getEHRs() {
    const aql = "select e/ehr_id as ehr_id, e/ehr_status/other_details as" +
        " other_details," +
        " e/ehr_status/subject/external_ref/id as nhsNumber, e/time_created as time_created from ehr e";
    return await CDRAQLQuery(aql, callbackProcessing);
}

export default getEHRs;
