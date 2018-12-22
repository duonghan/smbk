/**
 * Author: Duong Han
 * HUST
 * UserResponseHistory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import PsychologicalTable from './components/PsychologicTable';
import NeoTable from './components/NeoTable';
import RiasecTable from './components/RiasecTable';

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  background: white;
`;

/* eslint-disable react/prefer-stateless-function */
class UserResponseHistory extends React.Component {
  render() {
    return (
      <Container>
        <PsychologicalTable user={this.props.user} />
        <br />
        <NeoTable user={this.props.user} />
        <br />
        <RiasecTable user={this.props.user} />
      </Container>
    );
  }
}

UserResponseHistory.propTypes = {
  user: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.getIn(['auth', 'user', 'id']),
});

export default connect(mapStateToProps)(UserResponseHistory);
