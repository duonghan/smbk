/**
 * Author: Duong Han
 * HUST
 * QuestionTab
 *
 */

import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import GroupTable from './components/GroupTable/Loadable';
import QuestionTable from './components/QuestionTable/Loadable';

/* eslint-disable react/prefer-stateless-function */
class QuestionTab extends React.Component {
  render() {
    return (
      <div>
        <GroupTable />
        <QuestionTable />
      </div>
    );
  }
}

QuestionTab.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
});

export default connect(mapStateToProps)(injectIntl(QuestionTab));
