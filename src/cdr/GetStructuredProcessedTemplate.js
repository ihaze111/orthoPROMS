import * as axios from 'axios';
import CDROptions from './CDROptions';
import { treeTrawlGettingStructuredInputs } from '../ehr-template-processor';

/**
 * Get a structured template from the CDR and process it using ehr-template-processor
 * @param templateName
 * @returns {Promise<Array>}
 */
async function getStructuredProcessedTemplate(templateName) {
  let processedResult = [];
  const options = CDROptions.generateGetAxiosOptions(`/rest/v1/template/${templateName}`);
  try {
    const response = await axios(options);
    const result = response.data;
    const template = result.webTemplate;
    const language = template.defaultLanguage;
    const { tree } = template;
    processedResult = treeTrawlGettingStructuredInputs(tree, language);
  } catch (error) {
    console.log(error);
  }
  return processedResult;
}

export default getStructuredProcessedTemplate;
