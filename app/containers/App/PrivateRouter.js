import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRouter = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.get('isAuthorized') === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRouter.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.get('auth'),
});

export default connect(mapStateToProps)(PrivateRouter);
