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
} from './constants';

export const initialState = fromJS({
  id: '',
  answers: {
    questionId: '',
    value: '',
  },
  errors: {},
});

function responseContainerReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_RESPONSE:
      return state.mergeDeep({ ...action.initialValue });
    case INIT_SUCCESS:
      return state.set('id', action.responseId);
    case INIT_FAILED:
      return state.set('errors', action.err);
    case ADD_ANSWER:
      return state;
    default:
      return state;
  }
}

export default responseContainerReducer;
