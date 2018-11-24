/*
* Author: Duong Han
* HUST
* SettingContainer actions
*
*/

import {
  DEFAULT_ACTION,
  FETCH_FAILED,
  FETCH_PROFILE,
  FETCH_SUCCESS,
  UPDATE_FAILED,
  UPDATE_PROFILE,
  UPDATE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// fetch current profile
export const fetchProfile = () => ({
  type: FETCH_PROFILE,
});

export const fetchSuccess = profile => ({
  type: FETCH_SUCCESS,
  profile,
});

export const fetchFailed = err => ({
  type: FETCH_FAILED,
  err,
});

// fetch current profile
export const updateProfile = newProfile => {
  return {
    type: UPDATE_PROFILE,
    newProfile,
  };
};

export const updateSuccess = profile => ({
  type: UPDATE_SUCCESS,
  profile,
});

export const updateFailed = err => ({
  type: UPDATE_FAILED,
  err,
});
