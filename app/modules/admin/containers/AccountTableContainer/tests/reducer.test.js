import { fromJS } from 'immutable';
import accountTableContainerReducer from '../reducer';

describe('accountTableContainerReducer', () => {
  it('returns the initial state', () => {
    expect(accountTableContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
