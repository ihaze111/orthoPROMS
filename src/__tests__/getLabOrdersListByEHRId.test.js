import {
  labOrdersCallbackProcessing,
  formatContextTime,
  formatTiming,
} from '../components/Queries/getLabOrdersListByEHRId';

describe('Test suite for lab orders list', () => {
  it('should return resultSet if exists', () => {
    expect(formatContextTime('2015-02-23T00:11:02.518+02:00'))
      .toEqual('2015-02-23 00:11:02');
    expect(formatContextTime('2015-02-23 00:11:02'))
      .toEqual('2015-02-23 00:11:02');
    expect(formatContextTime('2015-02-23'))
      .toEqual('2015-02-23');
    expect(formatContextTime('00:11:02'))
      .toEqual('00:11:02');
  });

  it('should return timing format correctly', () => {
    expect(formatTiming('R5/2015-07-23T00:19:00+02:00/P2M'))
      .toEqual('2015-07-23 00:19:00');
  });

  it('should successfully process a sample response from the server', () => {
    const fromServer = {
      meta: {
        href: 'https://cdr.code4health.org/rest/v1/query/?aql=select%20a/composer/name%20as%20composer,%20b_a/activities%5Bat0001%5D/description%5Bat0009%5D/items%5Bat0121%5D/value/value%20as%20request,%20b_a/activities%5Bat0001%5D/timing/value%20as%20timing,%20a/context/start_time/value%20as%20context_time%20from%20EHR%20e%20contains%20COMPOSITION%20a%5BopenEHR-EHR-COMPOSITION.referral.v0%5D%20contains%20(%20INSTRUCTION%20b_a%5BopenEHR-EHR-INSTRUCTION.request-lab_test.v1%5D%20and%20ACTION%20b_b%5BopenEHR-EHR-ACTION.laboratory_test.v1%5D)%20where%20a/name/value%3D\'Laboratory%20order\'%20and%20e/ehr_id/value%3D\'b80a3a97-be75-41c6-a497-6ed53ce8f8c6\'',
      },
      aql: 'select a/composer/name as composer, b_a/activities[at0001]/description[at0009]/items[at0121]/value/value as request, b_a/activities[at0001]/timing/value as timing, a/context/start_time/value as context_time from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.referral.v0] contains ( INSTRUCTION b_a[openEHR-EHR-INSTRUCTION.request-lab_test.v1] and ACTION b_b[openEHR-EHR-ACTION.laboratory_test.v1]) where a/name/value=\'Laboratory order\' and e/ehr_id/value=\'b80a3a97-be75-41c6-a497-6ed53ce8f8c6\'',
      executedAql: 'select a/composer/name as composer, b_a/activities[at0001]/description[at0009]/items[at0121]/value/value as request, b_a/activities[at0001]/timing/value as timing, a/context/start_time/value as context_time from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.referral.v0] contains ( INSTRUCTION b_a[openEHR-EHR-INSTRUCTION.request-lab_test.v1] and ACTION b_b[openEHR-EHR-ACTION.laboratory_test.v1]) where a/name/value=\'Laboratory order\' and e/ehr_id/value=\'b80a3a97-be75-41c6-a497-6ed53ce8f8c6\'',
      resultSet: [
        {
          composer: 'Dr Joyce Smith',
          request: 'Urea, electrolytes and creatinine measurement',
          timing: 'R5/2015-07-23T00:19:00+02:00/P2M',
          context_time: '2015-07-23T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'Urea, electrolytes and creatinine measurement',
          timing: 'R5/2015-04-10T00:19:00+02:00/P2M',
          context_time: '2015-04-10T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'Urea, electrolytes and creatinine measurement',
          timing: 'R5/2015-02-22T00:23:00+02:00/P2M',
          context_time: '2015-02-22T00:23:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'hepatic function panel',
          timing: 'R5/2015-05-11T00:19:00+02:00/P2M',
          context_time: '2015-05-11T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'complete blood count',
          timing: 'R5/2015-06-13T00:19:00+02:00/P2M',
          context_time: '2015-06-13T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'complete blood count',
          timing: 'R5/2015-08-25T00:19:00+02:00/P2M',
          context_time: '2015-08-25T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'complete blood count',
          timing: 'R5/2015-09-27T00:19:00+02:00/P2M',
          context_time: '2015-09-27T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'hepatic function panel',
          timing: 'R5/2015-05-27T00:19:00+02:00/P2M',
          context_time: '2015-05-27T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'hepatic function panel',
          timing: 'R5/2015-02-10T00:19:00+02:00/P2M',
          context_time: '2015-02-10T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'lipids measurement',
          timing: 'R5/2015-09-14T00:19:00+02:00/P2M',
          context_time: '2015-09-14T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'lipids measurement',
          timing: 'R5/2015-04-14T00:19:00+02:00/P2M',
          context_time: '2015-04-14T00:19:02.518+02:00',
        },
        {
          composer: 'Dr Joyce Smith',
          request: 'lipids measurement',
          timing: 'R5/2015-10-24T00:19:00+02:00/P2M',
          context_time: '2015-10-24T00:19:02.518+02:00',
        },
      ],
    };
    const postProcessing = [
      {
        composer: 'Dr Joyce Smith',
        request: 'Urea, electrolytes and creatinine measurement',
        timing: '2015-07-23 00:19:00',
        context_time: '2015-07-23 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'Urea, electrolytes and creatinine measurement',
        timing: '2015-04-10 00:19:00',
        context_time: '2015-04-10 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'Urea, electrolytes and creatinine measurement',
        timing: '2015-02-22 00:23:00',
        context_time: '2015-02-22 00:23:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'hepatic function panel',
        timing: '2015-05-11 00:19:00',
        context_time: '2015-05-11 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'complete blood count',
        timing: '2015-06-13 00:19:00',
        context_time: '2015-06-13 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'complete blood count',
        timing: '2015-08-25 00:19:00',
        context_time: '2015-08-25 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'complete blood count',
        timing: '2015-09-27 00:19:00',
        context_time: '2015-09-27 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'hepatic function panel',
        timing: '2015-05-27 00:19:00',
        context_time: '2015-05-27 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'hepatic function panel',
        timing: '2015-02-10 00:19:00',
        context_time: '2015-02-10 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'lipids measurement',
        timing: '2015-09-14 00:19:00',
        context_time: '2015-09-14 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'lipids measurement',
        timing: '2015-04-14 00:19:00',
        context_time: '2015-04-14 00:19:02',
      },
      {
        composer: 'Dr Joyce Smith',
        request: 'lipids measurement',
        timing: '2015-10-24 00:19:00',
        context_time: '2015-10-24 00:19:02',
      },
    ];
    expect(labOrdersCallbackProcessing(fromServer))
      .toEqual(postProcessing);
  });
});
