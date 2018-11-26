/*
* Author: Duong Han
* HUST
* QuestionContainer actions
*
*/

import { DEFAULT_ACTION, UPDATE_RESPONSE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateResponse(response) {
  return { type: UPDATE_RESPONSE, response };
}
