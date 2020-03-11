import CDROptions from "./CDROptions";
import axios from "axios";


async function CDRAQLQuery(aql, callbackProcessing) {
    let processedResult;
    const options = CDROptions.generateQueryOptions(aql);
    try {
        const response = await axios(options);
        processedResult = callbackProcessing(response.data);
    } catch (error) {
        console.error(error);
    }

    return processedResult;
}

export default CDRAQLQuery;
