/*
* Author: Duong Han
* HUST
* HomePageContainer actions
*
*/

import {
  SET_CURRENT_SURVEY,
  FETCH_FAILED,
  FETCH_SUCCESS,
  FETCH_SURVEY,
  FETCH_GROUP,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_FAILED,
  CREATE_PROFILE,
} from './constants';

export function setCurrentSurvey(order) {
  return { type: SET_CURRENT_SURVEY, order };
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

export const createProfile = (profile, survey) => ({
  type: CREATE_PROFILE,
  profile,
  survey,
});
