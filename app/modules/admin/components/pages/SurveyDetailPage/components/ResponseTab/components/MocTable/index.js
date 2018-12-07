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

// import axios from 'axios';
import { Icon, Skeleton, Table, Row, Col, Modal } from 'antd';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
// import config from 'utils/validation/config';
import messages from './messages';
import columnOptions from './columnOptions';
import { fetchResponse } from '../../../../actions';
// import ExcelData from './ExcelData';

/* eslint-disable react/prefer-stateless-function */
class MocTable extends React.Component {
  state = {
    data: [],
    loading: true,
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
    const { formatMessage } = this.props.intl;

    Modal.info({
      title: <h3>{formatMessage(messages.profileModalTitle)}</h3>,
      content: (
        <div>
          <p>
            <strong>
              <FormattedMessage {...messages.nameLabel} />
            </strong>
          </p>
          <p>{this.state.data[key].profile.name}</p>

          <p>
            <strong>
              <FormattedMessage {...messages.workUnitLabel} />
            </strong>
          </p>
          <p>{this.state.data[key].profile.workUnit}</p>

          <p>
            <strong>
              <FormattedMessage {...messages.positionLabel} />
            </strong>
          </p>
          <p>{this.state.data[key].profile.position}</p>

          <p>
            <strong>
              <FormattedMessage {...messages.mainTaskLabel} />
            </strong>
          </p>
          <p>{this.state.data[key].profile.mainTask}</p>

          <p>
            <strong>
              <FormattedMessage {...messages.specialityLabel} />
            </strong>
          </p>
          <p>{this.state.data[key].profile.speciality}</p>

          <p>
            <strong>
              <FormattedMessage {...messages.personalEmailLabel} />
            </strong>
          </p>
          <p>{this.state.data[key].profile.personalEmail}</p>

          <p>
            <strong>
              <FormattedMessage {...messages.phoneLabel} />
            </strong>
          </p>
          <p>{this.state.data[key].profile.phone}</p>
        </div>
      ),
      onOk() {},
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
      <Row gutter={24}>
        <Col style={{ padding: 10 }}>
          <Skeleton loading={this.state.loading}>
            <Table
              bordered
              rowKey={record => record.id}
              dataSource={this.state.data}
              columns={columns}
              title={() => (
                <h3 style={{ color: '#FA541C' }}>
                  <strong>{formatMessage(messages.header)}</strong>
                  <a onClick={this.showModal} style={{ float: 'right' }}>
                    <Icon
                      type="file-excel"
                      style={{ fontSize: 20, color: '#FA541C' }}
                    />
                  </a>
                </h3>
              )}
              size="middle"
              rowClassName="editable-row"
            />
          </Skeleton>
        </Col>
      </Row>
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
