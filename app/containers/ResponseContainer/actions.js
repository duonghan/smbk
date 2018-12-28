/*
* Author: Duong Han
* HUST
* ResponseContainer actions
*
*/

import {
  ADD_ANSWER,
  SUBMIT_RESPONSE,
  SUBMIT_SUCCESS,
  INIT_RESPONSE,
  INIT_SUCCESS,
  INIT_FAILED,
  FETCH_QUESTION_GROUP,
  FETCH_SURVEY_INFO,
  SUBMIT_FAILED,
  SET_CURRENT_PROFILE,
} from './constants';

export const initResponse = initialValue => ({
  type: INIT_RESPONSE,
  value: initialValue,
});

export const fetchSurvey = () => ({ type: FETCH_SURVEY_INFO });

export const fetchQuestionGroup = () => ({ type: FETCH_QUESTION_GROUP });

// init response
export const initSucess = (responseId, totalQuestions) => ({
  type: INIT_SUCCESS,
  responseId,
  totalQuestions,
});

export const setCurrentProfile = profileId => ({
  type: SET_CURRENT_PROFILE,
  profileId,
});

export const initFailed = err => ({ type: INIT_FAILED, err });

// add and update answer
export const addAnswer = answer => ({
  type: ADD_ANSWER,
  answer,
});

// submit reponse
export const submitResponse = (response, gender, surveyId, userId) => ({
  type: SUBMIT_RESPONSE,
  response,
  gender,
  surveyId,
  userId,
});

export const submitSuccess = data => ({ type: SUBMIT_SUCCESS, data });

export const submitFailed = err => ({ type: SUBMIT_FAILED, err });
