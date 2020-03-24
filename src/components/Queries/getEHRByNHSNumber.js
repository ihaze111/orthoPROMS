import CDROptions from "./CDROptions";
import * as axios from "axios";

async function getEHRByNHSNumber(subjectId) {
    let processedResult = [];
    const options = CDROptions.generateAxiosOptions("/rest/v1/ehr/?subjectId=" + subjectId + "&subjectNamespace=uk.nhs.nhs_number");
    try {
        const response = await axios(options);
        const result = response.data;
        processedResult.ehrId = result.ehrId;
        if (result.ehrStatus && result.ehrStatus.otherDetails) {
            let [administrativeGender, birthSex, vitalStatus, birthYear] = result.ehrStatus.otherDetails.items[0].items.map((e) => {
                return e.value.value
            });
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
