/*
* Author: Duong Han
* HUST
* ResponseContainer actions
*
*/

import {
  ADD_ANSWER,
  UPDATE_ANSWER,
  SUBMIT_RESPONSE,
  SUBMIT_SUCCESS,
  INIT_RESPONSE,
  INIT_SUCCESS,
  INIT_FAILED,
} from './constants';

export const initResponse = initialValue => ({
  type: INIT_RESPONSE,
  initialValue,
});

export const initSucess = responseId => ({ type: INIT_SUCCESS, responseId });

export const initFailed = err => ({ type: INIT_FAILED, err });

export const addAnswer = answer => ({
  type: ADD_ANSWER,
  answer,
});

export const updateAnswer = answer => ({ type: UPDATE_ANSWER, answer });

export const submitResponse = () => ({ type: SUBMIT_RESPONSE });

export const submitSuccess = data => ({ type: SUBMIT_SUCCESS, data });
