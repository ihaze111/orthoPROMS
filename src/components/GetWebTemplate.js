import CDROptions from "./Queries/CDROptions";
import {
    inputToJsonFormInput,
    treeTrawlGettingFlatInputs,
    treeTrawlGettingStructuredInputs
} from "../ehr-template-processor/src/template";

const request = require('request-promise');

async function getWebTemplate(templateName) {
    let processedResult = [];
    const options = CDROptions.generateRequestOptions("/rest/v1/template/" + templateName);
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            const result = JSON.parse(response.body);
            let template = result.webTemplate;
            let language = template.defaultLanguage;
            let tree = template.tree;
            // const result1 = [];
            // treeTrawlGettingFlatInputs(tree, language, [], []).map((input) => {
            //     result1.push(inputToJsonFormInput(input, language));
            // });
            // processedResult = result1;
            processedResult = treeTrawlGettingStructuredInputs(tree, language, []);
        }
    );
    return processedResult;
}

export default getWebTemplate;
