import CDROptions from "./CDROptions";

const request = require('request-promise');

async function CDRAQLQuery(aql, callbackProcessing) {
    let processedResult;
    const options = CDROptions.generateQueryOptions(aql);
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            let responseBody = response.body.length > 0 ? response.body : '{}';
            const result = JSON.parse(responseBody);
            processedResult = callbackProcessing(result);
        }
    );
    return processedResult;
}

export default CDRAQLQuery;
