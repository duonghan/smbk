import React from 'react';
import axios from 'axios';

import { Table, Button, Input, Icon, Form, AutoComplete } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import config from 'utils/validation/config';
import messages from './messages';
import EditableCell, { EditableContext } from './EditableCell';
import { styles } from './styles';
import columnOptions from './columnOptions';
const { Search } = Input;

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class AccountTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      data: [],
      editingKey: '',
      searchText: '',
      loading: false,
    }; // Check here to configure the default column
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleDelete = key => {
    this.setState(prevState => ({
      data: [...prevState.data].filter(item => item.key !== key),
    }));
  };

  isEditing = record => record.key === this.state.editingKey;

  edit = key => {
    this.setState({ editingKey: key });
  };

  save(form, record, text) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      console.log(row);
      console.log(record);
      console.log(text);

      // debugger;
      // const newData = [...this.state.data];
      // debugger;
      // const index = newData.findIndex(item => key === item.key);
      // if (index > -1) {
      //   const item = newData[index];
      //   newData.splice(index, 1, {
      //     ...item,
      //     ...row,
      //   });
      //   this.setState({ data: newData, editingKey: '' });
      // } else {
      //   newData.push(row);
      //   this.setState({ data: newData, editingKey: '' });
      // }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  emitEmpty = () => {
    this.setState({ searchText: '' });
  };

  fetchUser = () => {
    this.setState({ loading: true });
    axios
      .get('/api/users/list', config)
      .then(res => {
        this.setState({
          data: res.data.map((account, i) => ({
            key: i + 1,
            ...account,
          })),
          loading: false,
        });
      })
      .catch(err => this.setState({ loading: false }));
  };

  render() {
    const { formatMessage } = this.props.intl;
    const sortedInfo = this.state.sortedInfo || {};
    const filteredInfo = this.state.filteredInfo || {};

    const components = { body: { row: EditableFormRow, cell: EditableCell } };

    const columns = columnOptions(
      sortedInfo,
      filteredInfo,
      formatMessage,
      this.isEditing,
      this.save,
      this.cancel,
      this.edit,
      this.handleDelete,
    ).map(col => {
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
    });

    return (
      <div>
        <Helmet title={formatMessage(messages.header)}>
          <meta
            name="description"
            content="Description of AccountTableContainer"
          />
        </Helmet>

        <div style={styles.tableOperations}>
          <AutoComplete
            dataSource={this.state.data.map(item => item.email)}
            onSelect={this.onSelect}
            onSearch={this.handleSearch}
            value={this.state.searchText}
            onChange={e => this.setState({ searchText: e.target.value })}
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
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
        </div>

        <Table
          components={components}
          bordered
          rowKey={record => record.id}
          dataSource={this.state.data}
          loading={this.state.loading}
          columns={columns}
          onChange={this.handleChange}
          size="middle"
          scroll={{ x: 715 }}
        />
      </div>
    );
  }
}

AccountTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AccountTable);
