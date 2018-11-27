import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the responseContainer state domain
 */

const selectResponseContainerDomain = state =>
  state.get('responseContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ResponseContainer
 */

const makeSelectResponseContainer = () =>
  createSelector(selectResponseContainerDomain, substate => substate.toJS());

export default makeSelectResponseContainer;
export { selectResponseContainerDomain };
