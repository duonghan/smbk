/*
* Author: Duong Han
* HUST
* SurveyContainer actions
*
*/

import {
  DEFAULT_ACTION,
  FETCH_FAILED,
  FETCH_SUCCESS,
  FETCH_SURVEY,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchSurvey() {
  return {
    type: FETCH_SURVEY,
  };
}

export function fetchSuccess(surveys) {
  return {
    type: FETCH_SUCCESS,
    surveys,
  };
}

export function fetchFailed(err) {
  return {
    type: FETCH_FAILED,
    err,
  };
}
