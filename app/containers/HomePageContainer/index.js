/**
 * Author: Duong Han
 * HUST
 * HomePageContainer
 *
 */

import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import MainApp from 'components/pages/HomePage';
import reducer from './reducer';
import saga from './saga';
import { createProfile, fetchSurvey } from './actions';

const mapStateToProps = state => ({
  surveys: state.getIn(['survey', 'items']),
  loading: state.getIn(['survey', 'loading']),
});

const mapDispatchToProps = dispatch => ({
  fetchSurvey: () => dispatch(fetchSurvey()),
  createProfile: (profile, survey) => dispatch(createProfile(profile, survey)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'survey', reducer });
const withSaga = injectSaga({ key: 'survey', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MainApp);
