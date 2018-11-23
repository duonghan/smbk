import { fromJS } from 'immutable';
import settingContainerReducer from '../reducer';

describe('settingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(settingContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
