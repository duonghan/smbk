import { fromJS } from 'immutable';
import authenticationReducer from '../reducers/signInReducer';

describe('authenticationReducer', () => {
  it('returns the initial state', () => {
    expect(authenticationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
