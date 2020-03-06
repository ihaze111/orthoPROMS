import CDRAQLQuery from "./CDRAQLQuery";

function callbackProcessing(result) {
    
    return result.resultSet.map((e) => {
        console.log(result.resultSet);
        let final = {};
        final.patientId = e.ehr_id.value || "";
        // if (e.other_details) {
            final.gender = e.other_details ? e.other_details.items[0].items[0].value.value : "";
            final.sex = e.other_details ? e.other_details.items[0].items[1].value.value : "";
            // final.vitalStatus = e.other_details ? e.other_details.items[0].items[2].value.value : "";
            // final.birthYear = e.other_details ? e.other_details.items[0].items[3].value.value : "";
            final.nhsNumber = e.nhsNumber ? e.nhsNumber.value : "";
            final.timeCreated = e.time_created ? e.time_created.value.replace(/T/, ",").substring(0, e.time_created.value.indexOf('.')) : "";
        // }
        // if(e.nhsNumber) {
            final.subjectId = e.nhsNumber ? e.nhsNumber.value : "";
        // }
        console.log(final);
        return final;
    });
}

async function getEHRs() {
    const aql = "select e/ehr_id as ehr_id, e/ehr_status/other_details as" +
        " other_details," +
        " e/ehr_status/subject/external_ref/id as nhsNumber, e/time_created as time_created from ehr e";
    return await CDRAQLQuery(aql, callbackProcessing);
}

export default getEHRs;
