import { SET_CURRENT_GROUP, SET_CURRENT_SURVEY } from './constants';

export const setCurrentSurvey = (surveyId, surveyName) => ({
  type: SET_CURRENT_SURVEY,
  surveyId,
  surveyName,
});

export const setCurrentGroup = groupId => ({
  type: SET_CURRENT_GROUP,
  groupId,
});
