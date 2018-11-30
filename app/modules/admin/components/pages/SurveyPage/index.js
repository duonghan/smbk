/**
 * Author: Duong Han
 * HUST
 * SurveyPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {
  AutoComplete,
  Button,
  Divider,
  Form,
  Icon,
  Input,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import messages from './messages';
import EditableCell, { EditableContext } from '../AccountPage/EditableCell';
import { styles } from '../AccountPage/styles';

const { Search } = Input;

const data = [];
for (let i = 1; i <= 46; i += 1) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    email: `test.email${i}@gmail.com`,
    children: [
      {
        key: 'asdasd',
        name: 'John Brown',
        email: `test.email${i}@gmail.com`,
      },
    ],
  });
}

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

/* eslint-disable react/prefer-stateless-function */
class SurveyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
      filteredInfo: null,
      sortedInfo: null,
      dataSource: data,
      editingKey: '',
      searchText: '',
      loading: false,
    }; // Check here to configure the default column

    this.columns = (sortedInfo, filteredInfo, formatMessage) => [
      {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        width: 50,
        sorter: (a, b) => a.key < b.key,
        sortOrder: sortedInfo.columnKey === 'key' && sortedInfo.order,
        fixed: 'left',
      },
      {
        title: formatMessage(messages.nameTitle),
        dataIndex: 'name',
        key: 'name',
        editable: true,
        sorter: (a, b) => a.name < b.name,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: formatMessage(messages.answerTitle),
        dataIndex: 'role',
        key: 'role',
        editable: true,
        render: () => (
          <span>
            <Tag color="blue">{formatMessage(messages.description)}</Tag>
          </span>
        ),
      },
      {
        title: formatMessage(messages.actionTitle),
        dataIndex: 'action',
        width: 140,
        key: 'action',
        align: 'center',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <span>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        <FormattedMessage {...messages.save} />
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title={formatMessage(messages.cancelPromtMsg)}
                    onConfirm={() => this.cancel(record.key)}
                    cancelText={formatMessage(messages.cancel)}
                  >
                    <a>
                      <FormattedMessage {...messages.cancel} />
                    </a>
                  </Popconfirm>
                </span>
              ) : (
                <Tooltip
                  placement="left"
                  title={formatMessage(messages.editToolTip)}
                >
                  <a onClick={() => this.edit(record.key)}>
                    <Icon type="edit" style={styles.icon} />
                  </a>
                </Tooltip>
              )}
              <Divider type="vertical" />
              <Tooltip
                placement="right"
                title={formatMessage(messages.deleteToolTip)}
              >
                <Popconfirm
                  title={formatMessage(messages.deletePromtMsg)}
                  onConfirm={() => this.handleDelete(record.key)}
                  cancelText={formatMessage(messages.cancel)}
                  icon={<Icon type="question-circle-o" style={styles.delete} />}
                >
                  <a>
                    <Icon type="delete" style={(styles.icon, styles.delete)} />
                  </a>
                </Popconfirm>
              </Tooltip>
            </span>
          );
        },
        fixed: 'right',
      },
    ];
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleDelete = key => {
    this.setState(prevState => ({
      dataSource: [...prevState.dataSource].filter(item => item.key !== key),
    }));
  };

  isEditing = record => record.key === this.state.editingKey;

  edit = key => {
    this.setState({ editingKey: key });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  onSelect = value => {
    this.setState({ searchText: value });
    console.log('onSelect', value);
  };

  emitEmpty = () => {
    debugger;
    this.setState({ searchText: '' });
  };

  // fetch = () => {
  //   debugger;
  //   this.setState({ loading: true });
  //   this.props.fetchUserList().then(data => {
  //     debugger;
  //     const pagination = { ...this.state.pagination };
  //     // Read total count from server
  //     // pagination.total = data.totalCount;
  //     pagination.total = 200;
  //     this.setState({ loading: false, dataSource: data, pagination });
  //   });
  // };

  // componentDidMount() {
  //   this.fetch();
  // }

  render() {
    // if (!Cookies.get('token')) {
    //   return <Redirect to="/" />;
    // }

    const { formatMessage } = this.props.intl;
    const { selectedRowKeys, dataSource } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'all-data',
          text: 'Select All Data',
          onSelect: () => {
            this.setState({
              selectedRowKeys: [...Array(46).keys()], // 0...45
            });
          },
        },
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
      onSelection: this.onSelection,
    };
    const sortedInfo = this.state.sortedInfo || {};
    const filteredInfo = this.state.filteredInfo || {};

    const components = { body: { row: EditableFormRow, cell: EditableCell } };

    const columns = this.columns(sortedInfo, filteredInfo, formatMessage).map(
      col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'role' ? 'select' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      },
    );

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <Helmet title={formatMessage(messages.header)}>
          <meta
            name="description"
            content="Description of AccountTableContainer"
          />
        </Helmet>
        <div style={styles.tableOperations}>
          <Button onClick={this.clearFilters} style={styles.button}>
            <FormattedMessage {...messages.clearFiltersBtn} />
          </Button>
          <Button onClick={this.clearAll} style={styles.button}>
            <FormattedMessage {...messages.clearFiltersSortedBtn} />
          </Button>
          <AutoComplete
            dataSource={dataSource.map(item => item.email)}
            onSelect={this.onSelect}
            onSearch={this.handleSearch}
            value={this.state.searchText}
            onChange={e => this.setState({ searchText: e.target.value })}
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
            style={styles.button}
          >
            <Search
              placeholder={formatMessage(messages.searchInput)}
              prefix={
                this.state.searchText !== '' ? (
                  <Icon type="close-circle" onClick={this.emitEmpty} />
                ) : null
              }
              onSearch={value => console.log(value)}
              style={{ ...styles.button }}
            />
          </AutoComplete>
          <Button type="primary" onClick={this.clearAll} style={styles.button}>
            <FormattedMessage {...messages.addNewItem} />
          </Button>
        </div>
        <div style={{ marginLeft: 10, marginBottom: 10 }}>
          <span>
            {hasSelected
              ? `${formatMessage(messages.selectedTextFirst)} ${
                  selectedRowKeys.length
                } ${formatMessage(messages.selectedTextLast)}`
              : ''}
          </span>
        </div>

        <Table
          components={components}
          bordered
          dataSource={dataSource}
          loading={this.state.loading}
          columns={columns}
          onChange={this.handleChange}
          rowSelection={rowSelection}
          size="middle"
          rowClassName="editable-row"
          scroll={{ x: 715 }}
        />
      </div>
    );
  }
}

SurveyTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SurveyTable);