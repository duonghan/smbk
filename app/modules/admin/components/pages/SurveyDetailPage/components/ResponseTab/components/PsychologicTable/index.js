/**
 * Author: Duong Han
 * HUST
 * PsychologicTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { Icon, Skeleton, Table } from 'antd';
import download from 'downloadjs';
import axios from 'axios';
import config from 'utils/validation/config';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import columnOptions from './columnOptions';
import messages from './messages';

const excelData = {
  labels: [
    'nameLabel',
    'stressLabel',
    'worryLabel',
    'depressionLabel',
    'concentratingLabel',
    'crazyLabel',
    'socialInteractionLabel',
    'studyLabel',
    'workLabel',
    'parentLabel',
    'teacherLabel',
    'againstLabel',
    'behaviorLabel',
    'fightLabel',
    'dateLabel',
  ],
  values: [],
};

/* eslint-disable react/prefer-stateless-function */
class PsychologicTable extends React.Component {
  state = {
    loading: true,
    data: [],
  };

  componentDidMount() {
    this.fetchResponse();
  }

  fetchResponse = () => {
    axios
      .get(`/api/survey/responses?survey=${this.props.surveyId}`, config)
      .then(res => {
        const data = res.data.map((i, key) => {
          const eachRow = {
            name: i.userName,
            key,
            date: i.date,
          };

          const rowExcelData = new Array(15).fill(0);
          rowExcelData[0] = i.userName;
          rowExcelData[14] = new Date(i.date).toLocaleString('vi-VN');

          i.results.map(it => {
            switch (it.item) {
              case 'Stress':
                eachRow.stress = it.value;
                rowExcelData[1] = it.value;
                break;
              case 'Lo âu':
                eachRow.worry = it.value;
                rowExcelData[2] = it.value;
                break;
              case 'Trầm cảm':
                eachRow.depression = it.value;
                rowExcelData[3] = it.value;
                break;
              case 'Khó tập trung':
                eachRow.concentrating = it.value;
                rowExcelData[4] = it.value;
                break;
              case 'Tăng động':
                eachRow.crazy = it.value;
                rowExcelData[5] = it.value;
                break;
              case 'Khó khăn về giao tiếp xã hội':
                eachRow.socialInteraction = it.value;
                rowExcelData[6] = it.value;
                break;
              case 'Khó khăn học tập':
                eachRow.study = it.value;
                rowExcelData[7] = it.value;
                break;
              case 'Khó khăn trong định hướng nghề nghiệp':
                eachRow.work = it.value;
                rowExcelData[8] = it.value;
                break;
              case 'Khó khăn trong mối quan hệ với cha mẹ':
                eachRow.parent = it.value;
                rowExcelData[9] = it.value;
                break;
              case 'Khó khăn trong mối quan hệ với thầy cô':
                eachRow.teacher = it.value;
                rowExcelData[10] = it.value;
                break;
              case 'Hành vi thách thức – chống đối':
                eachRow.against = it.value;
                rowExcelData[11] = it.value;
                break;
              case 'Rối loạn hành vi ứng xử':
                eachRow.behavior = it.value;
                rowExcelData[12] = it.value;
                break;
              case 'Gây hấn':
                eachRow.fight = it.value;
                rowExcelData[13] = it.value;
                break;
              default:
                break;
            }
          });

          excelData.values.push(rowExcelData);
          return eachRow;
        });
        this.setState({ data, loading: false });
      });
  };

  downloadExcelFile = formatMessage => {
    const data = {
      ...excelData,
      labels: excelData.labels.map(label => formatMessage(messages[label])),
    };

    axios
      .post(
        '/api/excel/psychological/response',
        { data },
        { ...config, responseType: 'blob' },
      )
      .then(res =>
        download(res.data, `${this.props.surveyName}_response_table.xlsx`),
      );
  };

  render() {
    const { formatMessage } = this.props.intl;
    const columns = columnOptions(formatMessage);

    return (
      <Skeleton loading={this.state.loading} active>
        <Table
          bordered
          rowKey={record => record.name}
          dataSource={this.state.data}
          columns={columns}
          title={() => (
            <h3 style={{ color: '#FA541C' }}>
              <strong>{formatMessage(messages.header)}</strong>
              <a
                onClick={() => this.downloadExcelFile(formatMessage)}
                style={{ float: 'right' }}
              >
                <Icon
                  type="download"
                  style={{ fontSize: 20, color: '#FA541C' }}
                />
              </a>
            </h3>
          )}
          size="middle"
          scroll={{ x: 3000 }}
        />
      </Skeleton>
    );
  }
}

PsychologicTable.propTypes = {
  intl: intlShape.isRequired,
  surveyId: PropTypes.string,
  surveyName: PropTypes.string,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
  surveyName: state.getIn(['surveyDetail', 'surveyName']),
});

export default connect(mapStateToProps)(injectIntl(PsychologicTable));
