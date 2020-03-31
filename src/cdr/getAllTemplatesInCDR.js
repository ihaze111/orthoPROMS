import * as axios from 'axios';
import CDROptions from './CDROptions';

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
