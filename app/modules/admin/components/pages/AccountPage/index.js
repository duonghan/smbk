import React from 'react';
import axios from 'axios';

import { Table, Modal, Input, Icon, Form, AutoComplete } from 'antd';
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

  handleDelete = id => {
    axios
      .delete('/api/users/', {
        ...config,
        data: {
          id,
        },
      })
      .then(res => {
        if (res.data.success) {
          this.fetchUser();
          Modal.success({
            title: this.props.intl.formatMessage(messages.successTitle),
            content: this.props.intl.formatMessage(
              messages.deleteSuccessContent,
            ),
          });
        }
      });
  };

  isEditing = record => record.key === this.state.editingKey;

  edit = key => {
    this.setState({ editingKey: key });
  };

  save = (form, id) => {
    this.setState({ loading: true });

    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      // update user infomation
      axios
        .put(
          '/api/users/',
          {
            id,
            ...row,
          },
          config,
        )
        .then(res => {
          if (res.data.success) {
            Modal.success({
              title: this.props.intl.formatMessage(messages.successTitle),
              content: this.props.intl.formatMessage(
                messages.updateSuccessContent,
              ),
            });
            this.fetchUser();
            this.setState({ loading: false });
          }
        });
    });

    this.setState({ editingKey: '' });
  };

  cancel = () => {
    this.setState({ editingKey: '' });
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
      this.state.searchText,
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
          <Search
            placeholder={formatMessage(messages.searchInput)}
            onSearch={value =>
              this.setState({
                searchText: value,
              })
            }
            style={{ ...styles.button }}
          />
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
