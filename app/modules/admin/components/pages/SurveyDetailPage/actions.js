import { SET_CURRENT_GROUP, SET_CURRENT_SURVEY } from './constants';

export const setCurrentSurvey = surveyId => ({
  type: SET_CURRENT_SURVEY,
  surveyId,
});

export const setCurrentGroup = groupId => ({
  type: SET_CURRENT_GROUP,
  groupId,
});
