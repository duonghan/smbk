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
  FETCH_QUESTION_GROUP,
  FETCH_SURVEY_INFO, SUBMIT_FAILED, RESET_ERROR,
} from './constants';

export const initResponse = initialValue => ({
  type: INIT_RESPONSE,
  value: initialValue,
});

export const fetchSurvey = () => ({ type: FETCH_SURVEY_INFO });

export const fetchQuestionGroup = () => ({ type: FETCH_QUESTION_GROUP });

export const initSucess = (responseId, totalQuestions) => ({
  type: INIT_SUCCESS,
  responseId,
  totalQuestions,
});

export const initFailed = err => ({ type: INIT_FAILED, err });

export const addAnswer = answer => ({
  type: ADD_ANSWER,
  answer,
});

export const updateAnswer = answer => ({ type: UPDATE_ANSWER, answer });

export const submitResponse = response => ({ type: SUBMIT_RESPONSE, response });

export const submitSuccess = data => ({ type: SUBMIT_SUCCESS, data });

export const submitFailed = err => ({ type: SUBMIT_FAILED, err });

export const resetError = () => ({ type: RESET_ERROR });
