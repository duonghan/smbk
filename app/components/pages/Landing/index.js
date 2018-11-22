/**
 *
 * Landing
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import { FormattedMessage } from 'react-intl';
import BackgroundImage from 'images/landing-background.jpg';
import Introduction from './Introduction';
import LandingBackground from './LandingBackground';
import LandingContainer from './LandingContainer';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Landing extends React.Component {
  handleLoginGuest = () => {};

  render() {
    return (
      <LandingContainer>
        <LandingBackground src={BackgroundImage} alt="background" />

        <Introduction>
          <FormattedMessage {...messages.introduce} />
          <br />
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: 10 }}
            onClick={this.handleLoginGuest}
          >
            <FormattedMessage {...messages.guestLogin} />
          </Button>
        </Introduction>
      </LandingContainer>
    );
  }
}

Landing.propTypes = {};

export default Landing;
