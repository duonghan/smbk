import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the questionContainer state domain
 */

const selectQuestionContainerDomain = state =>
  state.get('questionContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by QuestionContainer
 */

const makeSelectQuestionContainer = () =>
  createSelector(selectQuestionContainerDomain, substate => substate.toJS());

export default makeSelectQuestionContainer;
export { selectQuestionContainerDomain };
