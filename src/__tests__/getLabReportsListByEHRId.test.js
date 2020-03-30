import { labReportsCallbackProcessing } from "../components/Queries/getLabReportsListByEHRId";
import { formatTime } from '../components/Queries/queryProcessingHelpers';

describe('Tests on lab reports list', () => {
it('should return resultSet if exists', () => {
    expect(formatTime('2015-02-23T00:11:02.518+02:00')).toEqual('2015-02-23 00:11:02');
    expect(formatTime('2015-02-23 00:11:02')).toEqual('2015-02-23 00:11:02');
    expect(formatTime('2015-02-23')).toEqual('2015-02-23');
    expect(formatTime('00:11:02')).toEqual('00:11:02');
});

it('should successfully process a sample response from the server',() => {
    const fromServer = {
        "meta": {
            "href": "https://cdr.code4health.org/rest/v1/query/?aql=select%20a/composer/name%20as%20composer,%20b_a/data%5Bat0001%5D/events%5Bat0002%5D/data%5Bat0003%5D/items%5Bat0005%5D/value/value%20as%20test,%20b_a/data%5Bat0001%5D/events%5Bat0002%5D/data%5Bat0003%5D/items%5Bat0075%5D/value/value%20as%20test_timestamp,%20b_b/items%5Bat0002%5D/items%5Bat0003%5D/value/value%20as%20comment,%20b_a/data%5Bat0001%5D/events%5Bat0002%5D/data%5Bat0003%5D/items%5Bat0057%5D/value/value%20as%20conclusion%20from%20EHR%20e%20contains%20COMPOSITION%20a%5BopenEHR-EHR-COMPOSITION.report-result.v1%5D%20contains%20(%20OBSERVATION%20b_a%5BopenEHR-EHR-OBSERVATION.laboratory_test.v0%5D%20and%20CLUSTER%20b_b%5BopenEHR-EHR-CLUSTER.laboratory_test_panel.v0%5D)%20where%20a/name/value%3D'Laboratory%20test%20report'%20and%20e/ehr_id/value%3D'b80a3a97-be75-41c6-a497-6ed53ce8f8c6'"
        },
        "aql": "select a/composer/name as composer, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value/value as test, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0075]/value/value as test_timestamp, b_b/items[at0002]/items[at0003]/value/value as comment, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0057]/value/value as conclusion from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.report-result.v1] contains ( OBSERVATION b_a[openEHR-EHR-OBSERVATION.laboratory_test.v0] and CLUSTER b_b[openEHR-EHR-CLUSTER.laboratory_test_panel.v0]) where a/name/value='Laboratory test report' and e/ehr_id/value='b80a3a97-be75-41c6-a497-6ed53ce8f8c6'",
        "executedAql": "select a/composer/name as composer, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value/value as test, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0075]/value/value as test_timestamp, b_b/items[at0002]/items[at0003]/value/value as comment, b_a/data[at0001]/events[at0002]/data[at0003]/items[at0057]/value/value as conclusion from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.report-result.v1] contains ( OBSERVATION b_a[openEHR-EHR-OBSERVATION.laboratory_test.v0] and CLUSTER b_b[openEHR-EHR-CLUSTER.laboratory_test_panel.v0]) where a/name/value='Laboratory test report' and e/ehr_id/value='b80a3a97-be75-41c6-a497-6ed53ce8f8c6'",
        "resultSet": [
            {
                "composer": "Dr Lab",
                "test": "Urea, electrolytes and creatinine measurement",
                "test_timestamp": "2015-02-22T00:11:02.518+02:00",
                "comment": "may be technical artefact",
                "conclusion": "Rapidly deteriorating renal function"
            },
            {
                "composer": "Dr Lab",
                "test": "Urea, electrolytes and creatinine measurement",
                "test_timestamp": "2015-02-22T00:11:02.518+02:00",
                "comment": null,
                "conclusion": "Rapidly deteriorating renal function"
            },
            {
                "composer": "Dr Lab",
                "test": "Urea, electrolytes and creatinine measurement",
                "test_timestamp": "2015-07-23T00:11:02.518+02:00",
                "comment": "may be technical artefact",
                "conclusion": "Rapidly deteriorating renal function"
            },
            {
                "composer": "Dr Lab",
                "test": "Urea, electrolytes and creatinine measurement",
                "test_timestamp": "2015-07-23T00:11:02.518+02:00",
                "comment": null,
                "conclusion": "Rapidly deteriorating renal function"
            },
            {
                "composer": "Dr Lab",
                "test": "Urea, electrolytes and creatinine measurement",
                "test_timestamp": "2015-04-10T00:11:02.518+02:00",
                "comment": "this is free text",
                "conclusion": null
            },
            {
                "composer": "Dr Lab",
                "test": "Urea, electrolytes and creatinine measurement",
                "test_timestamp": "2015-04-10T00:11:02.518+02:00",
                "comment": null,
                "conclusion": null
            },
            {
                "composer": "Dr Lab",
                "test": "complete blood count",
                "test_timestamp": "2015-08-25T00:11:02.518+02:00",
                "comment": "indicates infection",
                "conclusion": "abnormal result indicating infection"
            },
            {
                "composer": "Dr Lab",
                "test": "complete blood count",
                "test_timestamp": "2015-08-25T00:11:02.518+02:00",
                "comment": null,
                "conclusion": "abnormal result indicating infection"
            },
            {
                "composer": "Dr Lab",
                "test": "complete blood count",
                "test_timestamp": "2015-06-13T00:11:02.518+02:00",
                "comment": "this is a normal result",
                "conclusion": "normal result"
            },
            {
                "composer": "Dr Lab",
                "test": "complete blood count",
                "test_timestamp": "2015-06-13T00:11:02.518+02:00",
                "comment": null,
                "conclusion": "normal result"
            },
            {
                "composer": "Dr Lab",
                "test": "complete blood count",
                "test_timestamp": "2015-09-27T00:11:02.518+02:00",
                "comment": null,
                "conclusion": "result within expected range"
            },
            {
                "composer": "Dr Lab",
                "test": "lipids measurement",
                "test_timestamp": "2015-10-24T00:13:27.518+02:00",
                "comment": "normal",
                "conclusion": "result within acceptable ranges"
            },
            {
                "composer": "Dr Lab",
                "test": "lipids measurement",
                "test_timestamp": "2015-10-24T00:13:27.518+02:00",
                "comment": null,
                "conclusion": "result within acceptable ranges"
            },
            {
                "composer": "Dr Lab",
                "test": "lipids measurement",
                "test_timestamp": "2015-04-14T00:13:27.518+02:00",
                "comment": "raised level",
                "conclusion": "abnormal result"
            },
            {
                "composer": "Dr Lab",
                "test": "lipids measurement",
                "test_timestamp": "2015-04-14T00:13:27.518+02:00",
                "comment": null,
                "conclusion": "abnormal result"
            },
            {
                "composer": "Dr Lab",
                "test": "lipids measurement",
                "test_timestamp": "2015-09-14T00:11:27.518+02:00",
                "comment": "indicates normal level",
                "conclusion": "normal result"
            },
            {
                "composer": "Dr Lab",
                "test": "lipids measurement",
                "test_timestamp": "2015-09-14T00:11:27.518+02:00",
                "comment": null,
                "conclusion": "normal result"
            },
            {
                "composer": "Dr Lab",
                "test": "hepatic function panel",
                "test_timestamp": "2015-02-10T00:13:13.518+02:00",
                "comment": "normal level",
                "conclusion": "some levels outside expected range - further investigations recommended"
            },
            {
                "composer": "Dr Lab",
                "test": "hepatic function panel",
                "test_timestamp": "2015-02-10T00:13:13.518+02:00",
                "comment": null,
                "conclusion": "some levels outside expected range - further investigations recommended"
            },
            {
                "composer": "Dr Lab",
                "test": "hepatic function panel",
                "test_timestamp": "2015-05-27T00:13:13.518+02:00",
                "comment": "raised level",
                "conclusion": "result outside expected range - indicates liver disease"
            },
            {
                "composer": "Dr Lab",
                "test": "hepatic function panel",
                "test_timestamp": "2015-05-27T00:13:13.518+02:00",
                "comment": null,
                "conclusion": "result outside expected range - indicates liver disease"
            },
            {
                "composer": "Dr Lab",
                "test": "hepatic function panel",
                "test_timestamp": "2015-05-11T00:13:24.518+02:00",
                "comment": "this result is normal",
                "conclusion": "result within expected range"
            },
            {
                "composer": "Dr Lab",
                "test": "hepatic function panel",
                "test_timestamp": "2015-05-11T00:13:24.518+02:00",
                "comment": null,
                "conclusion": "result within expected range"
            }
        ]
    };
    const postProcessing = [{
        "composer": "Dr Lab",
        "test": "Urea, electrolytes and creatinine measurement",
        "test_timestamp": "2015-02-22 00:11:02",
        "comment": "may be technical artefact",
        "conclusion": "Rapidly deteriorating renal function"
    },{
        "composer": "Dr Lab",
        "test": "Urea, electrolytes and creatinine measurement",
        "test_timestamp": "2015-02-22 00:11:02",
        "comment": null,
        "conclusion": "Rapidly deteriorating renal function"
    },{
        "composer": "Dr Lab",
        "test": "Urea, electrolytes and creatinine measurement",
        "test_timestamp": "2015-07-23 00:11:02",
        "comment": "may be technical artefact",
        "conclusion": "Rapidly deteriorating renal function"
    },{
        "composer": "Dr Lab",
        "test": "Urea, electrolytes and creatinine measurement",
        "test_timestamp": "2015-07-23 00:11:02",
        "comment": null,
        "conclusion": "Rapidly deteriorating renal function"
    },{
        "composer": "Dr Lab",
        "test": "Urea, electrolytes and creatinine measurement",
        "test_timestamp": "2015-04-10 00:11:02",
        "comment": "this is free text",
        "conclusion": null
    },{
        "composer": "Dr Lab",
        "test": "Urea, electrolytes and creatinine measurement",
        "test_timestamp": "2015-04-10 00:11:02",
        "comment": null,
        "conclusion": null
    },{
        "composer": "Dr Lab",
        "test": "complete blood count",
        "test_timestamp": "2015-08-25 00:11:02",
        "comment": "indicates infection",
        "conclusion": "abnormal result indicating infection"
    },{
        "composer": "Dr Lab",
        "test": "complete blood count",
        "test_timestamp": "2015-08-25 00:11:02",
        "comment": null,
        "conclusion": "abnormal result indicating infection"
    },{
        "composer": "Dr Lab",
        "test": "complete blood count",
        "test_timestamp": "2015-06-13 00:11:02",
        "comment": "this is a normal result",
        "conclusion": "normal result"
    },{
        "composer": "Dr Lab",
        "test": "complete blood count",
        "test_timestamp": "2015-06-13 00:11:02",
        "comment": null,
        "conclusion": "normal result"
    },{
        "composer": "Dr Lab",
        "test": "complete blood count",
        "test_timestamp": "2015-09-27 00:11:02",
        "comment": null,
        "conclusion": "result within expected range"
    },{
        "composer": "Dr Lab",
        "test": "lipids measurement",
        "test_timestamp": "2015-10-24 00:13:27",
        "comment": "normal",
        "conclusion": "result within acceptable ranges"
    },{
        "composer": "Dr Lab",
        "test": "lipids measurement",
        "test_timestamp": "2015-10-24 00:13:27",
        "comment": null,
        "conclusion": "result within acceptable ranges"
    },{
        "composer": "Dr Lab",
        "test": "lipids measurement",
        "test_timestamp": "2015-04-14 00:13:27",
        "comment": "raised level",
        "conclusion": "abnormal result"
    },{
        "composer": "Dr Lab",
        "test": "lipids measurement",
        "test_timestamp": "2015-04-14 00:13:27",
        "comment": null,
        "conclusion": "abnormal result"
    },{
        "composer": "Dr Lab",
        "test": "lipids measurement",
        "test_timestamp": "2015-09-14 00:11:27",
        "comment": "indicates normal level",
        "conclusion": "normal result"
    },{
        "composer": "Dr Lab",
        "test": "lipids measurement",
        "test_timestamp": "2015-09-14 00:11:27",
        "comment": null,
        "conclusion": "normal result"
    },{
        "composer": "Dr Lab",
        "test": "hepatic function panel",
        "test_timestamp": "2015-02-10 00:13:13",
        "comment": "normal level",
        "conclusion": "some levels outside expected range - further investigations recommended"
    },{
        "composer": "Dr Lab",
        "test": "hepatic function panel",
        "test_timestamp": "2015-02-10 00:13:13",
        "comment": null,
        "conclusion": "some levels outside expected range - further investigations recommended"
    },{
        "composer": "Dr Lab",
        "test": "hepatic function panel",
        "test_timestamp": "2015-05-27 00:13:13",
        "comment": "raised level",
        "conclusion": "result outside expected range - indicates liver disease"
    },{
        "composer": "Dr Lab",
        "test": "hepatic function panel",
        "test_timestamp": "2015-05-27 00:13:13",
        "comment": null,
        "conclusion": "result outside expected range - indicates liver disease"
    },{
        "composer": "Dr Lab",
        "test": "hepatic function panel",
        "test_timestamp": "2015-05-11 00:13:24",
        "comment": "this result is normal",
        "conclusion": "result within expected range"
    },{
        "composer": "Dr Lab",
        "test": "hepatic function panel",
        "test_timestamp": "2015-05-11 00:13:24",
        "comment": null,
        "conclusion": "result within expected range"
    }];
    expect(labReportsCallbackProcessing(fromServer)).toEqual(postProcessing);
});
});
