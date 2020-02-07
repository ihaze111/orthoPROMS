import CDRRequest from "./CDRRequest";
const request = require('request-promise');

async function getEHRId(subjectId) {
    let processedResult;
    const options = CDRRequest.generateRequestOptions("/rest/v1/ehr/?subjectId=" + subjectId + "&subjectNamespace=uk.nhs.nhs_number");
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            const result = JSON.parse(response.body);
            processedResult = result.ehrId;
        }
    );
    return processedResult;
}

export default getEHRId;
