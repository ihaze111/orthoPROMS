import axios from 'axios';
import CDROptions from './CDROptions';

/**
 * If a useful resultSet exists as a property of the inputted object, return it. Otherwise,
 * return an empty array.
 * @param result
 * @returns {Array|*}
 * @constructor
 */
export const QueryResultCallbackProcessing = {
  ReturnResultSetOrOtherwiseEmptyArray: (result) => {
    if (result) {
      if ('resultSet' in result) {
        return result.resultSet && Object.keys(result.resultSet).length !== 0
          ? result.resultSet
          : [];
      }
      return [];
    }
    return [];
  },
};

/**
 * Perform a query to the CDR
 * @param aql Query, in Archetype Query Language, to run on the CDR
 * @param callbackProcessing Function to process the JSON data returned by the query. The result of
 *   this callback function will be the returned result.
 * @returns {Promise<*>}
 * @constructor
 */
async function CDRAQLQuery(aql, callbackProcessing) {
  let processedResult;
  const options = CDROptions.generateQueryOptions(aql);
  // TODO: improve the http response handling
  try {
    const response = await axios(options);
    processedResult = callbackProcessing(response.data);
  } catch (error) {
    // TODO: handle error better
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return processedResult;
}

export default CDRAQLQuery;
