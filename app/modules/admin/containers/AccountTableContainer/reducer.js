/*
* Author: Duong Han
* HUST
* AccountTableContainer reducer
*
*/

import { fromJS } from 'immutable';
import { FETCH_SUCCESS, FETCH_FAILED } from './constants';

export const initialState = fromJS({
  data: {},
  error: '',
});

function accountTableContainerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return state.setIn(['data'], action.data);
    case FETCH_FAILED:
      return state.setIn(['error'], action.err);
    default:
      return state;
  }
}

export default accountTableContainerReducer;
