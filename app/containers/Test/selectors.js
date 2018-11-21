import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the test state domain
 */

const selectTestDomain = state => state.get('test', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Test
 */

const makeSelectTest = () =>
  createSelector(selectTestDomain, substate => substate.toJS());

export default makeSelectTest;
export { selectTestDomain };
