import * as axios from 'axios';
import CDROptions from './CDROptions';

/**
 * Get a full composition by its id, in structured format
 * @param compId
 * @returns {Promise}
 */
async function getCompositionByCompositionId(compId) {
  let processedResult = [];
  const options = CDROptions.generateGetAxiosOptions(`/rest/v1/composition/${compId}?format=STRUCTURED`);
  try {
    const response = await axios(options);
    const result = response.data;
    processedResult = result;
  } catch (error) {
    processedResult = { error: error.response.data.userMessage };
  }
  return processedResult;
}

export default getCompositionByCompositionId;
