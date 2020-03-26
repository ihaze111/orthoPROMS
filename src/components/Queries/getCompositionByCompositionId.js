import CDROptions from "./CDROptions";
import * as axios from "axios";

async function getCompositionByCompositionId(compId) {
    let processedResult = [];
    const options = CDROptions.generateGetAxiosOptions("/rest/v1/composition/" + compId + '?format=STRUCTURED');
    try {
        const response = await axios(options);
        const result = response.data;
        processedResult = result;
    } catch (error) {
        console.log(error);
    }
    return processedResult;
}

export default getCompositionByCompositionId;
