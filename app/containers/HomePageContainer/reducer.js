/*
* Author: Duong Han
* HUST
* HomePageContainer reducer
*
*/

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, FETCH_FAILED, FETCH_SUCCESS } from './constants';

export const initialState = fromJS({
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
    default:
      return state;
  }
}

export default mainPageContainerReducer;
