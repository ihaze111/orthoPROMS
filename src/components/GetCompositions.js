import CDRRequest from "./CDRRequest";

const request = require('request-promise');

async function getCompositions() {
    let processedResult = [];
    const options = CDRRequest.generateQueryOptions("select a/uid/value as comp_id," +
        " e/ehr_status/subject/external_ref/id/value as nhs_number, a/composer/name as composer_name," +
        " b_b/items[at0001]/value/value as episode_identifier," +
        " b_a/data[at0001]/events[at0002]/data[at0003]/items[at0027]/value/value as aofas_comment from EHR e contains" +
        " COMPOSITION a[openEHR-EHR-COMPOSITION.report.v1] contains ( OBSERVATION b_a[openEHR-EHR-OBSERVATION.aofas.v0] and CLUSTER b_b[openEHR-EHR-CLUSTER.episode_details_northproms.v0]) where a/name/value='UCLH Foot and ankle PROMs' and e/ehr_id/value='b80a3a97-be75-41c6-a497-6ed53ce8f8c6'");
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            const result = JSON.parse(response.body);
            console.log("QUERY LOG");
            console.log(result);
            processedResult = result.resultSet;
            processedResult = processedResult.map((e) => {
                return e;
            });
        }
    );
    return processedResult;
}

export default getCompositions;
