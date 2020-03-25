import CDROptions from "./Queries/CDROptions";
import { treeTrawlGettingStructuredInputs } from "../ehr-template-processor/src/template";
import * as axios from "axios";

async function getStructuredProcessedTemplate(templateName) {
    let processedResult = [];
    const options = CDROptions.generateGetAxiosOptions("/rest/v1/template/" + templateName);
    try {
        const response = await axios(options);
        const result = response.data;
        let template = result.webTemplate;
        let language = template.defaultLanguage;
        let tree = template.tree;
        processedResult = treeTrawlGettingStructuredInputs(tree, language, []);
    } catch (error) {
        console.log(error);
    }
    return processedResult;
}

export default getStructuredProcessedTemplate;
