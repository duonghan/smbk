import { fromJS } from 'immutable';
import mainPageContainerReducer from '../reducer';

describe('mainPageContainerReducer', () => {
  it('returns the initial state', () => {
    expect(mainPageContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
