/**
 *
 * Landing
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Button, Carousel } from 'antd';

import Cookies from 'js-cookie';
// import SignupForm from 'components/SignupForm';
import { Redirect, Link } from 'react-router-dom';
// import SignupForm from 'components/SignupForm';
import { FormattedMessage } from 'react-intl';
import history from 'utils/history';
import messages from './messages';
import jwtDecode from 'jwt-decode';
import { signInSuccess } from '../../containers/Authentication/actions';
// import './styles.css';

const LandingContainer = styled.div`
  position: relative;
  text-align: center;
`;

// const LandingContainer = styled.div`
//   width: 100%;
//   height: 715px;
// `;

const LandingBackground = styled.img`
  src: 'https://i.imgur.com/exRgOC9.jpg';
  alt: 'background';
  width: 100%;
  min-height: 100%;
  -webkit-filter: brightness(20%);
  filter: brightness(20%);
`;

const EntryText = styled.p`
  font-size: 2em;
  text-align: center;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/* eslint-disable react/prefer-stateless-function */
class Landing extends React.Component {
  handleExplore = () => {
    console.log('asdasdasd');
    // this.props.history.push('/explore');
    return <Link to="/explore" />;
  };

  render() {
    debugger;
    // if (Cookies.get('token')) {
    //   // decode token and set current user
    //   const userInfo = jwtDecode(Cookies.get('token'));
    //
    //   switch (userInfo.role) {
    //     case 'DEFAULT':
    //       history.push('/home');
    //       break;
    //     case 'ADMIN':
    //       history.push('/admin');
    //       break;
    //     default:
    //   }
    // }

    return (
      <LandingContainer>
        <LandingBackground src="https://i.imgur.com/exRgOC9.jpg" />
        <div style={{ background: 'red' }}>
          <EntryText>
            <FormattedMessage {...messages.introduce} />
            <br />
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 10 }}
              onClick={this.handleExplore}
            >
              <FormattedMessage {...messages.guestLogin} />
            </Button>
          </EntryText>
        </div>
      </LandingContainer>
    );
  }
}

Landing.propTypes = {};

export default Landing;
