import Login from 'components/auth/LoginForm';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { signInRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

const mapStateToProps = state => ({
  errors: state.getIn(['auth', 'errors']),
  auth: state.get('auth'),
});

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: userData => dispatch(signInRequest(userData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );
//
// const withReducer = injectReducer({ key: 'auth', reducer });
// const withSaga = injectSaga({ key: 'auth', saga });
//
// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
// )(Login);
