/**
 *
 * Landing
 *
 */

import React from 'react';
// import styled from 'styled-components';
import { Button } from 'antd';

import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import BackgroundImage from 'images/landing-background.jpg';
import { signInGuest } from 'containers/Authentication/actions';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Introduction from './Introduction';
import LandingBackground from './LandingBackground';
import LandingContainer from './LandingContainer';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Landing extends React.Component {
  // Router to right page follow role of user
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.get('isAuthorized')) {
      return nextProps.history.push('/');
    }
    return null;
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <LandingContainer>
        <Helmet title={formatMessage(messages.header)} />
        <LandingBackground src={BackgroundImage} alt="background" />
        <Introduction>
          <FormattedMessage {...messages.introduce} />
          <br />
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: 10 }}
            onClick={this.props.onSignInGuest}
          >
            <FormattedMessage {...messages.guestLogin} />
          </Button>
        </Introduction>
      </LandingContainer>
    );
  }
}

Landing.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  auth: state.get('auth'),
});
const mapDispatchToProps = dispatch => ({
  onSignInGuest: () => dispatch(signInGuest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(Landing)));
