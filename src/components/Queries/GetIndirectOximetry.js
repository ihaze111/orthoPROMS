import CDRAQLQuery from "./CDRAQLQuery";

async function getIndirectOximetry(ehrId) {
    const aql = "select a_a/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value/numerator as numerator, a_a/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value/denominator as denominator, a_a/data[at0001]/origin/value as time from EHR e contains COMPOSITION a contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.indirect_oximetry.v1] where e/ehr_id/value='" + ehrId + "'";
    return await CDRAQLQuery(aql, (result) => {
        return result.resultSet ? result.resultSet : [];
    });
}

export default getIndirectOximetry;
