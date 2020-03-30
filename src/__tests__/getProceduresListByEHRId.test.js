import { proceduresCallbackProcessing, timeFormat } from "../components/Queries/getProceduresListByEHRId";

describe('Test suite for procedures list', () => {
it('should return resultSet if exists', () => {
    expect(timeFormat('2015-02-23T00:11:02.518+02:00')).toEqual('2015-02-23 00:11:02');
    expect(timeFormat('2015-02-23 00:11:02')).toEqual('2015-02-23 00:11:02');
    expect(timeFormat('2015-02-23')).toEqual('2015-02-23');
    expect(timeFormat('00:11:02')).toEqual('00:11:02');
});

it('should successfully process a sample response from the server', () => {
    const fromServer = {
        "meta": {
            "href": "https://cdr.code4health.org/rest/v1/query/?aql=select%20a_a/description%5Bat0001%5D/items%5Bat0002%5D/value/value%20as%20procedure_name,%20a_a/description%5Bat0001%5D/items%5Bat0049%5D/value/value%20as%20notes,%20a_a/time/value%20as%20time,%20a/composer/name%20as%20name,%20a_a/ism_transition/careflow_step/value%20as%20careflow_step%20from%20EHR%20e%20contains%20COMPOSITION%20a%20contains%20ACTION%20a_a%5BopenEHR-EHR-ACTION.procedure.v1%5D%20where%20e/ehr_id/value%3D'b80a3a97-be75-41c6-a497-6ed53ce8f8c6'"
        },
        "aql": "select a_a/description[at0001]/items[at0002]/value/value as procedure_name, a_a/description[at0001]/items[at0049]/value/value as notes, a_a/time/value as time, a/composer/name as name, a_a/ism_transition/careflow_step/value as careflow_step from EHR e contains COMPOSITION a contains ACTION a_a[openEHR-EHR-ACTION.procedure.v1] where e/ehr_id/value='b80a3a97-be75-41c6-a497-6ed53ce8f8c6'",
        "executedAql": "select a_a/description[at0001]/items[at0002]/value/value as procedure_name, a_a/description[at0001]/items[at0049]/value/value as notes, a_a/time/value as time, a/composer/name as name, a_a/ism_transition/careflow_step/value as careflow_step from EHR e contains COMPOSITION a contains ACTION a_a[openEHR-EHR-ACTION.procedure.v1] where e/ehr_id/value='b80a3a97-be75-41c6-a497-6ed53ce8f8c6'",
        "resultSet": [
            {
                "procedure_name": "total replacement of hip",
                "notes": "No intra-operative problems",
                "time": "2015-07-15T15:11:33.829Z",
                "name": "Dr Joyce Smith",
                "careflow_step": "Procedure performed"
            },
            {
                "procedure_name": "appendicectomy",
                "notes": "discharged after 48 hours",
                "time": "2015-07-21T15:31:33.829Z",
                "name": "Dr Joyce Smith",
                "careflow_step": "Procedure performed"
            },
            {
                "procedure_name": "open reduction of closed clavicular fracture",
                "notes": null,
                "time": "2015-08-12T12:17:33.829Z",
                "name": "Dr Joyce Smith",
                "careflow_step": "Procedure performed"
            },
            {
                "procedure_name": "amputation of hallux",
                "notes": "left foot following trauma",
                "time": "2015-03-15T15:11:33.829Z",
                "name": "Dr Joyce Smith",
                "careflow_step": "Procedure performed"
            },
            {
                "procedure_name": "debridement of leg ulcer",
                "notes": null,
                "time": "2015-03-17T15:09:33.829Z",
                "name": "Dr Joyce Smith",
                "careflow_step": "Procedure performed"
            },
            {
                "procedure_name": "total thyroidectomy",
                "notes": null,
                "time": "2015-10-17T15:09:45.829Z",
                "name": "Dr Joyce Smith",
                "careflow_step": "Procedure performed"
            }
        ]
    };
    const postProcessing = [
        {
            "procedure_name": "total replacement of hip",
            "notes": "No intra-operative problems",
            "time": "2015-07-15 15:11:33",
            "name": "Dr Joyce Smith",
            "careflow_step": "Procedure performed"
        },
        {
            "procedure_name": "appendicectomy",
            "notes": "discharged after 48 hours",
            "time": "2015-07-21 15:31:33",
            "name": "Dr Joyce Smith",
            "careflow_step": "Procedure performed"
        },
        {
            "procedure_name": "open reduction of closed clavicular fracture",
            "notes": null,
            "time": "2015-08-12 12:17:33",
            "name": "Dr Joyce Smith",
            "careflow_step": "Procedure performed"
        },
        {
            "procedure_name": "amputation of hallux",
            "notes": "left foot following trauma",
            "time": "2015-03-15 15:11:33",
            "name": "Dr Joyce Smith",
            "careflow_step": "Procedure performed"
        },
        {
            "procedure_name": "debridement of leg ulcer",
            "notes": null,
            "time": "2015-03-17 15:09:33",
            "name": "Dr Joyce Smith",
            "careflow_step": "Procedure performed"
        },
        {
            "procedure_name": "total thyroidectomy",
            "notes": null,
            "time": "2015-10-17 15:09:45",
            "name": "Dr Joyce Smith",
            "careflow_step": "Procedure performed"
        }
    ];
    expect(proceduresCallbackProcessing(fromServer)).toEqual(postProcessing);
});
})
