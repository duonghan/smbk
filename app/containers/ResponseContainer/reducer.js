/*
* Author: Duong Han
* HUST
* ResponseContainer reducer
*
*/

import { fromJS } from 'immutable';
import {
  INIT_RESPONSE,
  INIT_SUCCESS,
  INIT_FAILED,
  ADD_ANSWER,
  SUBMIT_FAILED,
  RESET_ERROR,
} from './constants';

export const initialState = fromJS({
  id: '',
  total: 0,
  answers: {},
  errors: {},
});

function responseContainerReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      debugger;
      const a = state.mergeDeep({
        id: action.responseId,
        total: action.totalQuestions,
        answers: {},
        errors: {},
      });
      return a;
    case INIT_FAILED:
      return state.set('errors', action.err);
    case SUBMIT_FAILED:
      return state.set('errors', action.err);
    case RESET_ERROR:
      return state.set('errors', {});
    case ADD_ANSWER:
      return state.setIn(
        ['answers', action.answer.questionId],
        fromJS({
          orderNum: action.answer.orderNum,
          score: action.answer.score,
        }),
      );
    default:
      return state;
  }
}

export default responseContainerReducer;
