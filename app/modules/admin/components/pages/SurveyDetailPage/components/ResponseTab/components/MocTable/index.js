/**
 * Author: Duong Han
 * HUST
 * MocTable
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import axios from 'axios';
import { Icon, Skeleton, Table, Row, Col, Divider } from 'antd';
import download from 'downloadjs';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import config from 'utils/validation/config';
import messages from './messages';
import columnOptions from './columnOptions';
import { fetchResponse } from '../../../../actions';

/* eslint-disable react/prefer-stateless-function */
class MocTable extends React.Component {
  state = {
    data: [],
    loading: true,
    current: -1,
  };

  componentDidMount() {
    this.props.fetchResponse(this.props.surveyId, 'moc');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response) {
      this.setState({
        data: nextProps.response.map((item, index) => {
          item.key = index; // add order number for response data - (#)
          return item;
        }),
        loading: false,
      });
    }
  }

  viewProfile = key => {
    this.setState({ current: key });
  };

  downloadExcelFile = () => {
    axios
      .get(`/api/survey/responses/export?survey=${this.props.surveyId}`, {
        ...config,
        responseType: 'blob',
      })
      .then(res => {
        download(res.data, 'report.xlsx');
        console.log(res.data);
      });
  };

  render() {
    const { formatMessage } = this.props.intl;

    const columns = columnOptions(
      formatMessage,
      this.viewProfile,
      this.handleDelete,
    );

    return (
      <div>
        <Skeleton loading={this.state.loading} active>
          <Table
            bordered
            rowKey={record => record.key}
            dataSource={this.state.data}
            columns={columns}
            title={() => (
              <h3 style={{ color: '#FA541C' }}>
                <strong>{formatMessage(messages.header)}</strong>
                <a onClick={this.downloadExcelFile} style={{ float: 'right' }}>
                  <Icon
                    type="download"
                    style={{ fontSize: 20, color: '#FA541C' }}
                  />
                </a>
              </h3>
            )}
            size="middle"
            rowClassName="editable-row"
          />
        </Skeleton>
        <Row gutter={24} style={{ margin: 5 }}>
          <Divider>
            {this.state.current > -1 && (
              <h3>
                <FormattedMessage {...messages.detailDividerLabel} />
              </h3>
            )}
          </Divider>
          {this.state.current > -1 &&
            Object.entries(this.state.data[this.state.current].profile)
              .filter(entry => entry[0] !== '_id' && entry[0] !== '__v')
              .map(entry => (
                <Row
                  type="flex"
                  justify="center"
                  gutter={16}
                  style={{ marginBottom: 10 }}
                >
                  <Col md={8} sm={12} xs={24}>
                    <FormattedMessage {...messages[`${entry[0]}Label`]} />
                  </Col>
                  <Col md={8} sm={12} xs={24} style={{ color: '#1890ff' }}>
                    {entry[0] === 'date'
                      ? new Date(entry[1]).toLocaleString('vi-VN')
                      : entry[1]}
                  </Col>
                </Row>
              ))}
        </Row>
      </div>
    );
  }
}

MocTable.propTypes = {
  intl: intlShape.isRequired,
  surveyId: PropTypes.string,
  fetchResponse: PropTypes.func.isRequired,
  response: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
  response: state.getIn(['surveyDetail', 'response']),
});

const mapDispatchToProps = dispatch => ({
  fetchResponse: (surveyId, extra = '') =>
    dispatch(fetchResponse(surveyId, extra)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(MocTable));
