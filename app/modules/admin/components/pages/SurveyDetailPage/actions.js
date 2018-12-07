import {
  FETCH_RESPONSE,
  FETCH_RESPONSE_FAILED,
  FETCH_RESPONSE_SUCCESS,
  SET_CURRENT_GROUP,
  SET_CURRENT_SURVEY,
} from './constants';

export const setCurrentSurvey = (surveyId, surveyName) => ({
  type: SET_CURRENT_SURVEY,
  surveyId,
  surveyName,
});

export const setCurrentGroup = (groupId, groupName) => ({
  type: SET_CURRENT_GROUP,
  groupId,
  groupName,
});

export const fetchResponse = (surveyId, extra) => ({
  type: FETCH_RESPONSE,
  surveyId,
  extra,
});

export const fetchResponseSucceed = response => ({
  type: FETCH_RESPONSE_SUCCESS,
  response,
});

export const fetchResponseFailed = err => ({
  type: FETCH_RESPONSE_FAILED,
  err,
});
