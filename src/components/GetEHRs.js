import CDRRequest from "./CDRRequest";

const request = require('request-promise');

async function getEHRs() {
    let processedResult = [];
    const options = CDRRequest.generateQueryOptions("select e/ehr_id as ehr_id, e/ehr_status/other_details as" +
        " other_details," +
        " e/ehr_status/subject/external_ref/id as nhsNumber, e/time_created as time_created from ehr e");
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            const result = JSON.parse(response.body);
            processedResult = result.resultSet;
            processedResult = processedResult.map((e) => {
              let final = {};
              final.patientId = e.ehr_id.value;
              final.gender = e.other_details.items[0].items[0].value.value;
              final.sex = e.other_details.items[0].items[1].value.value;
              final.vitalStatus = e.other_details.items[0].items[2].value.value;
              final.birthYear = e.other_details.items[0].items[3].value.value;
              final.nhsNumber = e.nhsNumber.value;
              final.timeCreated = e.time_created.value;
              return final;
            });
      }
    );
    return processedResult;
}

export default getEHRs;
