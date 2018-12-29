import Login from 'components/auth/LoginForm';
import { connect } from 'react-redux';
import { signInRequest } from './actions';

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
