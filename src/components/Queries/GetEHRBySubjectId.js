import CDROptions from "./CDROptions";

const request = require('request-promise');

async function getEHRBySubjectId(subjectId) {
    let processedResult = [];
    const options = CDROptions.generateRequestOptions("/rest/v1/ehr/?subjectId=" + subjectId + "&subjectNamespace=uk.nhs.nhs_number");
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            let responseBody = response.body.length > 0 ? response.body : '{}';
            const result = JSON.parse(responseBody);
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
        }
    );
    return processedResult;
}

export default getEHRBySubjectId;
