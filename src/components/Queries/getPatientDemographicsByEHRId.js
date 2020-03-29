import CDROptions from "./CDROptions";
import * as axios from "axios";

async function getPatientDemographicsByEHRId(ehrId) {
    let processedResult = [];
    const options = CDROptions.generateGetAxiosOptions("/rest/v1/demographics/ehr/" + ehrId + "/party");
    try {
        const response = await axios(options);
        if (response.status === 200) {
            const r = response.data.party;
            if ('partyAdditionalInfo' in r) {
                r.partyAdditionalInfo.forEach((addInfo) => {
                    r[addInfo.key] = addInfo.value;
                });
            }
            const returnedObject = [];
            let firstName = r.firstNames ? r.firstNames : '';
            let lastName = r.lastNames ? r.lastNames : '';
            let title = r.title ? r.title : '';
            if (firstName || lastName || title) returnedObject.push(["Name", title + " " + firstName + " " + lastName]);
            if ('gender' in r) returnedObject.push(["Gender", r.gender]);
            if ('dateOfBirth' in r) returnedObject.push(["Date of Birth", r.dateOfBirth]);
            if ('address' in r) returnedObject.push(["Address", r.address.address]);
            processedResult = returnedObject;
        }
    } catch (error) {
        processedResult = false;
    }
    return processedResult;
}

export default getPatientDemographicsByEHRId;
