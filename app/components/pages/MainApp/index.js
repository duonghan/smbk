/**
 *
 * MainApp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Layout, Row, Col, Card, Icon, Pagination } from 'antd';
import SurveyItem from 'components/pages/survey/SurveyItem';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Cookies from 'js-cookie';

// import { FormattedMessage } from 'react-intl';

// import messages from './messages';

const surveys = [
  {
    title: 'Survey1',
    content: 'asdadasd',
  },
  {
    title: 'Survey2',
    content: 'asdadasd',
  },
  {
    title: 'Survey3',
    content: 'asdadasd',
  },
  {
    title: 'Survey4',
    content: 'asdadasd',
  },
  {
    title: 'Survey5',
    content: 'asdadasd',
  },
  {
    title: 'Survey6',
    content: 'asdadasd',
  },
  {
    title: 'Survey7',
    content: 'asdadasd',
  },
  {
    title: 'Survey8',
    content: 'asdadasd',
  },
  {
    title: 'Survey9',
    content: 'asdadasd',
  },
  {
    title: 'Survey10',
    content: 'asdadasd',
  },
  {
    title: 'Survey11',
    content: 'asdadasd',
  },
];

/* eslint-disable react/prefer-stateless-function */
class MainApp extends React.Component {
  onAddNewSurvey = () => {
    // this.props.history.push('/add');
  };

  render() {
    debugger;
    //
    // if (!Cookies.get('token')) {
    //   return <Redirect to="/" />;
    // }

    return (
      <Layout>
        <Row gutter={16} type="flex" justify="space-around" align="middle">
          <Col className="gutter-row" xs={24} sm={12} md={6}>
            <Card
              hoverable
              style={{ textAlign: 'center' }}
              title="Add new survey"
            >
              <Icon
                type="plus-circle"
                style={{ fontSize: 50 }}
                onClick={this.onAddNewSurvey}
              />
            </Card>
          </Col>
          {surveys.map(item => {
            return (
              <Col
                className="gutter-row"
                xs={24}
                sm={12}
                md={6}
                key={item.title}
              >
                <SurveyItem />
              </Col>
            );
          })}
        </Row>
        <Pagination
          size="small"
          total={surveys.length}
          style={{ marginTop: 40, textAlign: 'center' }}
        />
      </Layout>
    );
  }
}

export default connect()(MainApp);

// MainApp.propTypes = {
//   token: PropTypes.string,
//   history: PropTypes.object.isRequired,
// };
//
