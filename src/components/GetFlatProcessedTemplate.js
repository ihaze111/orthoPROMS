import CDROptions from "./Queries/CDROptions";
import { treeTrawlGettingFlatInputs } from "../ehr-template-processor/src/template";
import * as axios from "axios";

async function getFlatProcessedTemplate(templateName) {
    let processedResult = [];
    const options = CDROptions.generateGetAxiosOptions("/rest/v1/template/" + templateName);
    axios(options)
        .then(function (response) {
            console.log(response);
            const result = response.data;
            let template = result.webTemplate;
            let language = template.defaultLanguage;
            let tree = template.tree;
            processedResult = treeTrawlGettingFlatInputs(tree, language);
        })
        .catch(function (error) {
            console.log(error);
        });
    return processedResult;
}

export default getFlatProcessedTemplate;
