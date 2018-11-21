/**
 * Author: Duong Han
 * HUST
 * HomePageContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import MainApp from 'components/MainApp';

import injectReducer from 'utils/injectReducer';
import makeSelectHomePageContainer from './selectors';
import reducer from './reducer';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class HomePageContainer extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Description of HomePageContainer" />
        </Helmet>
        <MainApp />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

// medium.com/@stepankuzmin/authentication-with-react-router-redux-5-x-and-redux-saga-55da66b54be7

// https: HomePageContainer.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  homePageContainer: makeSelectHomePageContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePageContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePageContainer);
