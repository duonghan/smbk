import { fromJS } from 'immutable';
import isEmpty from 'utils/validation/isEmpty';
import { SIGNIN_FAILURE, SET_CURRENT_USER, SIGNOUT_SUCCESS } from './constants';

const initialState = fromJS({
  isAuthorized: false,
  errors: {
    email: '',
    password: '',
  },
});

const authorize = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state.mergeDeep({
        isAuthorized: !isEmpty(action.userInfo),
        user: action.userInfo,
      });
    case SIGNIN_FAILURE:
      return state.set('errors', action.err);
    case SIGNOUT_SUCCESS:
      return state.mergeDeep({
        isAuthorized: !isEmpty(action.payload),
        user: action.payload,
      });
    default:
      return state;
  }
};

export default authorize;
