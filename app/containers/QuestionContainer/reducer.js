/*
* Author: Duong Han
* HUST
* QuestionContainer reducer
*
*/

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, UPDATE_RESPONSE } from './constants';

export const initialState = fromJS({
  survey: '',
  user: '',
  responses: [],
});

function questionContainerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_RESPONSE:
      return state.update('responses', students =>
        students.push(fromJS(action.response)),
      );
    default:
      return state;
  }
}

export default questionContainerReducer;
