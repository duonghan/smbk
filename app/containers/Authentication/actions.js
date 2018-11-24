/*
* Author: Duong Han
* HUST
* Authentication actions
*
*/

import {
  SIGNIN_REQUEST,
  SET_CURRENT_USER,
  SIGNIN_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNIN_GUEST,
} from './constants';

// sign in actions
export const signInRequest = userData => ({
  type: SIGNIN_REQUEST,
  payload: userData,
});

export const signInGuest = () => ({
  type: SIGNIN_GUEST,
  payload: { isGuest: true },
});

export const setCurrentUser = userInfo => ({
  type: SET_CURRENT_USER,
  userInfo,
});

export const signInFailed = err => ({
  type: SIGNIN_FAILURE,
  err,
});

// sign out actions
export const signoutRequest = () => {
  return {
    type: SIGNOUT_REQUEST,
  };
};

export const signoutSuccess = () => ({
  type: SIGNOUT_SUCCESS,
  payload: {},
});
