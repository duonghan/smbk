/*
* Author: Duong Han
* HUST
* SurveyDetailPage reducer
*
*/

import { fromJS } from 'immutable';
import {
  FETCH_RESPONSE_SUCCESS,
  SET_CURRENT_GROUP,
  SET_CURRENT_SURVEY,
} from './constants';

export const initialState = fromJS({
  surveyId: '',
});

const surveyDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SURVEY:
      return state
        .set('surveyId', action.surveyId)
        .set('surveyName', action.surveyName);
    case SET_CURRENT_GROUP:
      return state
        .set('groupId', action.groupId)
        .set('groupName', action.groupName);
    case FETCH_RESPONSE_SUCCESS:
      return state.set('response', action.response);
    default:
      return state;
  }
};

export default surveyDetailReducer;
