import * as axios from 'axios';
import CDROptions from './CDROptions';
import { treeTrawlGettingFlatInputs } from '../ehr-template-processor';

/**
 * Get a flat template from the CDR and process it using ehr-template-processor
 * @param templateName
 * @returns {Promise<Array>}
 */
async function getFlatProcessedTemplate(templateName) {
  let processedResult = [];
  const options = CDROptions.generateGetAxiosOptions(`/rest/v1/template/${templateName}`);
  axios(options)
    .then((response) => {
      const result = response.data;
      const template = result.webTemplate;
      const language = template.defaultLanguage;
      const { tree } = template;
      processedResult = treeTrawlGettingFlatInputs(tree, language);
    })
    .catch((error) => {
      console.log(error);
    });
  return processedResult;
}

export default getFlatProcessedTemplate;
