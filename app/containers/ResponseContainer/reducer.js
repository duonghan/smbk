/*
* Author: Duong Han
* HUST
* ResponseContainer reducer
*
*/

import { fromJS } from 'immutable';
import {
  INIT_SUCCESS,
  INIT_FAILED,
  ADD_ANSWER,
  SUBMIT_FAILED,
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
      return state
        .mergeDeep({ id: action.responseId, total: action.totalQuestions })
        .set('answers', fromJS({}))
        .set('errors', fromJS({}));

    case INIT_FAILED:
      return state.set('errors', action.err);

    case SUBMIT_FAILED:
      return state.set('errors', action.err);

    case ADD_ANSWER:
      return state.setIn(
        ['answers', action.answer.groupId, action.answer.questionId],
        fromJS({
          orderNum: action.answer.orderNum,
          score: action.answer.score,
          checkedValues: action.answer.checked,
          text: action.answer.text,
        }),
      );

    default:
      return state;
  }
}

export default responseContainerReducer;
