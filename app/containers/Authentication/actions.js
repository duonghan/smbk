/*
* Author: Duong Han
* HUST
* Authentication actions
*
*/

import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
} from './constants';

// sign in actions
export const signInRequest = userData => ({
  type: SIGNIN_REQUEST,
  payload: userData,
});

export const signInSuccess = userInfo => ({
  type: SIGNIN_SUCCESS,
  userInfo,
});

export const signInFailed = err => ({
  type: SIGNIN_FAILURE,
  err,
});

// sign out actions
export const signoutRequest = () => {
  debugger;
  return {
    type: SIGNOUT_REQUEST,
  };
};

export const signoutSuccess = () => ({
  type: SIGNOUT_SUCCESS,
  payload: {},
});
