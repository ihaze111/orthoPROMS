import CDRAQLQuery from './CDRAQLQuery';

/**
 * Return simplified JSON regarding anonymous data about the patient
 * Uses specification of anonymized patient archetype:
 * https://ckm.openehr.org/ckm/archetypes/1013.1.1745
 * @param tree
 * @returns {{gender: string, birthYear: string, sex: string, vitalStatus: string}}
 */
function processOtherDetails(tree) {
  const processedResult = {
    gender: '',
    sex: '',
    vitalStatus: '',
    birthYear: '',
  };
  if (tree === null) return processedResult;
  if (tree['@class'] === 'ITEM_TREE' && 'items' in tree) {
    const treeItem = tree.items[0];
    if (treeItem.archetype_node_id === 'openEHR-EHR-CLUSTER.person_anonymised_parent.v1') {
      treeItem.items.forEach((item) => {
        const nodeIdToKey = {
          at0001: 'gender',
          at0002: 'sex',
          at0003: 'vitalStatus',
          at0014: 'birthYear',
        };
        processedResult[nodeIdToKey[item.archetype_node_id]] = item.value.value;
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
    final.patientId = e.ehr_id.value || '';
    if ('nhsNumber' in e) {
      final.subjectId = e.nhsNumber ? e.nhsNumber.value : '';
      final.nhsNumber = e.nhsNumber ? e.nhsNumber.value : '';
    }
    return final;
  });
}

/**
 * Get a list every EHR in the CDR that has an NHS number associated with it, for display in a
 * table, containing:
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
  const aql = 'select\n'
    + '    e/ehr_id as ehr_id,\n'
    + '    e/ehr_status/other_details as other_details,\n'
    + '    e/ehr_status/subject/external_ref/id as nhsNumber,\n'
    + '    e/time_created as time_created\n'
    + 'from EHR e\n'
    + 'where e/ehr_status/subject/external_ref/namespace = \'uk.nhs.nhs_number\'';
  return CDRAQLQuery(aql, callbackProcessing);
}

export default getAllEHRsInCDR;
