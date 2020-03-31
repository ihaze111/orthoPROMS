import { QueryResultCallbackProcessing } from '../cdr/CDRAQLQuery';

it('should return resultSet if exists', () => {
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray({}))
    .toEqual([]);
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray([]))
    .toEqual([]);
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(''))
    .toEqual([]);
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(null))
    .toEqual([]);
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(undefined))
    .toEqual([]);
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray({ resultSet: {} }))
    .toEqual([]);
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray({ resultSet: [] }))
    .toEqual([]);
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray({ resultSet: '' }))
    .toEqual([]);
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray({ resultSet: null }))
    .toEqual([]);
  expect(QueryResultCallbackProcessing.ReturnResultSetOrOtherwiseEmptyArray(
    { resultSet: undefined },
  ))
    .toEqual([]);
});
