/*
* Author: Duong Han
* HUST
* AccountTableContainer actions
*
*/

import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED } from './constants';

export const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

export const fetchSuccess = data => ({ type: FETCH_SUCCESS, data });

export const fetchFailed = err => ({ type: FETCH_FAILED, err });
