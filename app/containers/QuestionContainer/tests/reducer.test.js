import { fromJS } from 'immutable';
import questionContainerReducer from '../reducer';

describe('questionContainerReducer', () => {
  it('returns the initial state', () => {
    expect(questionContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
