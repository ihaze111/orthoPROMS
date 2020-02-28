import CDROptions from "./CDROptions";
import { inputToJsonFormInput, treeTrawlGettingFlatInputs } from "../ehr-template-processor/src/template";

const request = require('request-promise');

async function getWebTemplate() {
    let processedResult = [];
    const options = CDROptions.generateRequestOptions("/rest/v1/template/Foot_and_Ankle_PROMs-v0");
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            const result = JSON.parse(response.body);
            let template = result.webTemplate;
            let language = template.defaultLanguage;
            let tree = template.tree;
            const result1 = [];
            treeTrawlGettingFlatInputs(tree, language, [], []).map((input) => {
                result1.push(inputToJsonFormInput(input, language));
            });
            processedResult = result1;
        }
    );
    return processedResult;
}

export default getWebTemplate;
