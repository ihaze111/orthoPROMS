import { timeFormat } from "../components/Queries/getAllergiesListByEHRId";

it('should return resultSet if exists', () => {
    expect(timeFormat('2015-02-23T00:11:02.518+02:00')).toEqual('2015-02-23 00:11:02');
    expect(timeFormat('2015-02-23 00:11:02')).toEqual('2015-02-23 00:11:02');
    expect(timeFormat('2015-02-23')).toEqual('2015-02-23');
    expect(timeFormat('00:11:02')).toEqual('00:11:02');
});
