import qs from "qs";
import CDROptions from "../components/CDROptions";
const request = require('request-promise');

async function getEHRId(subjectId) {
    let processedResult;
    const options = CDROptions.generateRequestOptions("/rest/v1/ehr/?subjectId=" + subjectId + "&subjectNamespace=uk.nhs.nhs_number");
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            const result = JSON.parse(response.body);
            processedResult = result.ehrId;
        }
    );
    return processedResult;
}

export function getSubjectId(locationSearch) {
    return qs.parse(locationSearch, { ignoreQueryPrefix: true }).subjectId ?
        qs.parse(locationSearch, { ignoreQueryPrefix: true }).subjectId : "9999999000"
}

export function loadEhrId() {
    let subjectId = getSubjectId(this.props.location.search);
    let promise = getEHRId(subjectId);
    promise.then((e) => {
        this.setState({ ehrId: e });
    });
}
