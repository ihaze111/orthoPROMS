import * as axios from 'axios';
import CDROptions from './CDROptions';

/**
 * Get a list of the template ids of all templates (PROMs surveys) in the CDR
 * @returns {Promise<defaults.templates|{monospaceLinks, cleverLinks}|templates|{suggestion}>}
 */
async function getAllTemplatesInCDR() {
  let processedResult = [];
  const options = CDROptions.generateGetAxiosOptions('/rest/v1/template');
  try {
    const response = await axios(options);
    const result = response.data;
    processedResult = result.templates;
  } catch (error) {
    throw new Error(error);
  }
  return processedResult;
}

export default getAllTemplatesInCDR;
