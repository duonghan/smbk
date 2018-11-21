/**
 * Author: Duong Han
 * HUST
 * AccountTableContainer
 *
 */

import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AccountTable from '../../components/AccountTable';
import reducer from './reducer';
import saga from './saga';
import { fetchRequest } from './actions';

const mapStateToProps = state => ({
  data: state.getIn(['accounts', 'data']),
});

const mapDispatchToProps = dispatch => ({
  fetchUserList: dispatch(fetchRequest),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'accounts', reducer });
const withSaga = injectSaga({ key: 'accounts', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountTable);
