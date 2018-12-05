/*
* Author: Duong Han
* HUST
* SurveyDetailPage reducer
*
*/

import { fromJS } from 'immutable';
import { SET_CURRENT_GROUP, SET_CURRENT_SURVEY } from './constants';

export const initialState = fromJS({
  surveyId: '',
});

const surveyDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SURVEY:
      return state.set('surveyId', action.surveyId);
    case SET_CURRENT_GROUP:
      return state.set('groupId', action.groupId);
    default:
      return state;
  }
};

export default surveyDetailReducer;
