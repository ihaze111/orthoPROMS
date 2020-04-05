import * as axios from 'axios';
import CDROptions from './CDROptions';

/**
 * Get the key details of an EHR (id, anonymized data etc.) by their NHS number
 * @param subjectId
 * @returns {Promise}
 */
async function getEHRByNHSNumber(subjectId) {
  const processedResult = [];
  const options = CDROptions.generateGetAxiosOptions(`/rest/v1/ehr/?subjectId=${subjectId}&subjectNamespace=uk.nhs.nhs_number`);
  try {
    const response = await axios(options);
    const result = response.data;
    processedResult.ehrId = result.ehrId;
    if (result.ehrStatus && result.ehrStatus.otherDetails) {
      const [administrativeGender, birthSex, vitalStatus, birthYear] = result
        .ehrStatus.otherDetails.items[0].items.map((e) => e.value.value);
      processedResult.administrativeGender = administrativeGender;
      processedResult.birthSex = birthSex;
      processedResult.vitalStatus = vitalStatus;
      processedResult.birthYear = birthYear;
    }
  } catch (error) {
    throw new Error(error);
  }
  return processedResult;
}

export default getEHRByNHSNumber;
