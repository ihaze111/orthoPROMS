import CDROptions from "./CDROptions";

const request = require('request-promise');

async function CDRAQLQuery(aql, callbackProcessing) {
    let processedResult;
    const options = CDROptions.generateQueryOptions(aql);
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            const result = JSON.parse(response.body);
            processedResult = callbackProcessing(result);
        }
    );
    return processedResult;
}

export default CDRAQLQuery;
