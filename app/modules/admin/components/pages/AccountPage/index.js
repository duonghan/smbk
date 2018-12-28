import React from 'react';
import axios from 'axios';

import { Table, Modal, Input, Icon, Form, message } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import config from 'utils/validation/config';
import messages from './messages';
import EditableCell, { EditableContext } from './EditableCell';
import { styles } from './styles';
import columnOptions from './columnOptions';
import AccountForm from './AccountForm';

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
      visible: false,
      editingKey: '',
      loading: false,
    }; // Check here to configure the default column
  }

  componentDidMount() {
    this.fetchUser();
  }

  // Handle with Account Form
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      axios
        .post(
          '/api/users/addUser',
          {
            ...values,
          },
          config,
        )
        .then(res => {
          if (res.data.success) {
            message.success(
              this.props.intl.formatMessage(messages.addUserSuccessMsg),
            );
            this.fetchUser();
          } else {
            message.error(
              this.props.intl.formatMessage(messages.addUserFailedMsg),
            );
          }
        });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  // -- End Handle

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
          message.success(
            this.props.intl.formatMessage(messages.deleteSuccessContent),
          );
          this.fetchUser();
        }
      });
  };

  isEditing = record => record.key === this.state.editingKey;

  edit = record => {
    this.setState({ editingKey: record });
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
            message.success(
              this.props.intl.formatMessage(messages.updateSuccessContent),
            );
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
            key: i,
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
        onCell: record => {
          let inputType = 'text';
          if (col.dataIndex === 'role') inputType = 'role';
          if (col.dataIndex === 'gender') inputType = 'gender';

          return {
            record,
            inputType,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          };
        },
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

        <Table
          components={components}
          bordered
          rowKey={record => record.id}
          dataSource={this.state.data}
          loading={this.state.loading}
          title={() => (
            <h3 style={{ color: '#FA541C' }}>
              <strong>{formatMessage(messages.header)}</strong>
              <a onClick={this.showModal} style={{ float: 'right' }}>
                <Icon type="plus" style={{ fontSize: 20, color: '#FA541C' }} />
              </a>
            </h3>
          )}
          columns={columns}
          onChange={this.handleChange}
          size="middle"
          scroll={{ x: 715 }}
        />

        <AccountForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          account={this.state.editingKey}
        />
      </div>
    );
  }
}

AccountTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AccountTable);
