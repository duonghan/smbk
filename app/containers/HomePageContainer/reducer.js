/*
* Author: Duong Han
* HUST
* HomePageContainer reducer
*
*/

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_FAILED,
  FETCH_SUCCESS,
  SET_CURRENT_SURVEY,
} from './constants';

export const initialState = fromJS({
  current: '',
  loading: true,
  items: [],
});

function mainPageContainerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_SUCCESS:
      return state.set('items', action.surveys).set('loading', false);
    case FETCH_FAILED:
      return state.set('errors', action.err);
    case SET_CURRENT_SURVEY:
      return state.set('current', action.order);
    default:
      return state;
  }
}

export default mainPageContainerReducer;
