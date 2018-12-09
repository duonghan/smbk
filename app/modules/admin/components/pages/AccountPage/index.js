import React from 'react';
import axios from 'axios';

import { Table, Button, Input, Icon, Form, AutoComplete } from 'antd';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import config from 'utils/validation/config';
import messages from './messages';
import EditableCell, { EditableContext } from './EditableCell';
import { styles } from './styles';
import columnOptions from './data/columnOptions';
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
      dataSource: [],
      editingKey: '',
      searchText: '',
      loading: false,
    }; // Check here to configure the default column

    // this.fetch();
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

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
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
      debugger;
      const newData = [...this.state.dataSource];
      debugger;
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ dataSource: newData, editingKey: '' });
      }
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
          dataSource: res.data.map((account, i) => ({
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
    const { dataSource } = this.state;
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
          rowKey="uid"
          dataSource={dataSource}
          loading={this.state.loading}
          columns={columns}
          onChange={this.handleChange}
          size="middle"
          rowClassName="editable-row"
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
