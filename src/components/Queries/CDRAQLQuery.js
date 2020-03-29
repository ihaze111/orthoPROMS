import CDROptions from "./CDROptions";
import axios from "axios";

export const QueryResultCallbackProcessing = {
    ReturnResultSetOrOtherwiseEmptyArray: (result) => {
        return result ? ('resultSet' in result ? ((result.resultSet && Object.keys(result.resultSet).length !== 0) ? result.resultSet : []) : []) : [];
    }
};

/**
 * Perform a query to the CDR
 * @param aql Query, in Archetype Query Language, to run on the CDR
 * @param callbackProcessing Function to process the JSON data returned by the query. The result of this callback
 * function will be the returned result.
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
        console.error(error);
    }
    return processedResult;
}

export default CDRAQLQuery;
