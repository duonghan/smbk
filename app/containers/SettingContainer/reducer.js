/*
* Author: Duong Han
* HUST
* SettingContainer reducer
*
*/

import { fromJS } from 'immutable';
import {
  FETCH_FAILED,
  FETCH_SUCCESS,
  UPDATE_FAILED,
  UPDATE_SUCCESS,
} from './constants';

export const initialState = fromJS({
  profile: {
    id: '',
    name: '',
    email: '',
  },
  errors: {
    authorize: '',
    password: '',
  },
});

function settingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
    case UPDATE_SUCCESS:
      return state.set('profile', fromJS(action.profile));
    case FETCH_FAILED:
    case UPDATE_FAILED:
      return state.set('errors', fromJS(action.err));
    default:
      return state;
  }
}

export default settingContainerReducer;
