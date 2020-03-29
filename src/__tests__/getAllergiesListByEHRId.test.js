import { allergiesCallbackProcessing, timeFormat } from "../components/Queries/getAllergiesListByEHRId";

it('should return resultSet if exists', () => {
    expect(timeFormat('2015-02-23T00:11:02.518+02:00')).toEqual('2015-02-23 00:11:02');
    expect(timeFormat('2015-02-23 00:11:02')).toEqual('2015-02-23 00:11:02');
    expect(timeFormat('2015-02-23')).toEqual('2015-02-23');
    expect(timeFormat('00:11:02')).toEqual('00:11:02');
});

it('should successfully process a sample response from the server', () => {
    const fromServer = {
        "meta": { "href": "https://cdr.code4health.org/rest/v1/query/" },
        "aql": "select\n" +
            "    a_a/data[at0001]/items[at0025]/items[at0004]/value/value as reaction,\n    a_a/data[at0001]/items[at0025]/items[at0022]/value/value as comment,\n    a_a/data[at0001]/items[at0002]/value/value as cause,\n    a_b/data[at0001]/items[at0002.1]/value/value as exclusion,\n    a_b/protocol[at0006]/items[at0004]/value/value as update_exclusion_date,\n    a/composer/name as composer\nfrom EHR e\ncontains COMPOSITION a\ncontains (\n    EVALUATION a_a[openEHR-EHR-EVALUATION.adverse_reaction_uk.v1] or\n    EVALUATION a_b[openEHR-EHR-EVALUATION.exclusion-adverse_reaction.v1]) where e/ehr_id/value='6ad6c847-7c37-485d-8dbb-7b56d1c23918'",
        "executedAql": "select\n    a_a/data[at0001]/items[at0025]/items[at0004]/value/value as reaction,\n    a_a/data[at0001]/items[at0025]/items[at0022]/value/value as comment,\n    a_a/data[at0001]/items[at0002]/value/value as cause,\n    a_b/data[at0001]/items[at0002.1]/value/value as exclusion,\n    a_b/protocol[at0006]/items[at0004]/value/value as update_exclusion_date,\n    a/composer/name as composer\nfrom EHR e\ncontains COMPOSITION a\ncontains (\n    EVALUATION a_a[openEHR-EHR-EVALUATION.adverse_reaction_uk.v1] or\n    EVALUATION a_b[openEHR-EHR-EVALUATION.exclusion-adverse_reaction.v1]) where e/ehr_id/value='6ad6c847-7c37-485d-8dbb-7b56d1c23918'",
        "resultSet": [{
            "reaction": "allergic angio-oedema due to ingested food",
            "comment": "observed by clinician",
            "cause": "allergy to seafood",
            "exclusion": null,
            "update_exclusion_date": null,
            "composer": "Dr Joyce Smith"
        }, {
            "reaction": "eruption due to drug",
            "comment": "History unclear",
            "cause": "allergy to penicillin",
            "exclusion": null,
            "update_exclusion_date": null,
            "composer": "Dr Joyce Smith"
        }, {
            "reaction": "vomiting",
            "comment": "reported by patient",
            "cause": "salicylate allergy",
            "exclusion": null,
            "update_exclusion_date": null,
            "composer": "Dr Joyce Smith"
        }, {
            "reaction": "sneezing",
            "comment": "reported by carer",
            "cause": "allergy to animal hair",
            "exclusion": null,
            "update_exclusion_date": null,
            "composer": "Dr Joyce Smith"
        }, {
            "reaction": "rhinitis",
            "comment": "patient reported",
            "cause": "dust allergy",
            "exclusion": null,
            "update_exclusion_date": null,
            "composer": "Dr Joyce Smith"
        }, {
            "reaction": null,
            "comment": null,
            "cause": null,
            "exclusion": "no known allergies",
            "update_exclusion_date": "2015-02-23T00:11:02.518+02:00",
            "composer": "Dr Joyce Smith"
        }]
    };
    const postProcessing = [{
        "reaction": "allergic angio-oedema due to ingested food",
        "comment": "observed by clinician",
        "cause": "allergy to seafood",
        "exclusion": null,
        "update_exclusion_date": null,
        "composer": "Dr Joyce Smith"
    }, {
        "reaction": "eruption due to drug",
        "comment": "History unclear",
        "cause": "allergy to penicillin",
        "exclusion": null,
        "update_exclusion_date": null,
        "composer": "Dr Joyce Smith"
    }, {
        "reaction": "vomiting",
        "comment": "reported by patient",
        "cause": "salicylate allergy",
        "exclusion": null,
        "update_exclusion_date": null,
        "composer": "Dr Joyce Smith"
    }, {
        "reaction": "sneezing",
        "comment": "reported by carer",
        "cause": "allergy to animal hair",
        "exclusion": null,
        "update_exclusion_date": null,
        "composer": "Dr Joyce Smith"
    }, {
        "reaction": "rhinitis",
        "comment": "patient reported",
        "cause": "dust allergy",
        "exclusion": null,
        "update_exclusion_date": null,
        "composer": "Dr Joyce Smith"
    }, {
        "reaction": null,
        "comment": null,
        "cause": null,
        "exclusion": "no known allergies",
        "update_exclusion_date": "2015-02-23 00:11:02",
        "composer": "Dr Joyce Smith"
    }];
    expect(allergiesCallbackProcessing(fromServer)).toEqual(postProcessing);
})
