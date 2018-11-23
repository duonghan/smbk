/**
 * Author: Duong Han
 * HUST
 * SettingContainer
 *
 */

import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SettingPage from 'components/pages/Setting';
import reducer from './reducer';
import saga from './saga';
import { fetchProfile, updateProfile } from './actions';

const mapStateToProps = state => {
  debugger;
  return {
    errors: state.getIn(['setting', 'errors']),
    profile: state.getIn(['setting', 'profile']),
    auth: state.get('auth'),
  };
};

const mapDispatchToProps = dispatch => ({
  onFetchProfile: () => dispatch(fetchProfile()),
  onUpdateProfile: newProfile => dispatch(updateProfile(newProfile)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'setting', reducer });
const withSaga = injectSaga({ key: 'setting', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingPage);
