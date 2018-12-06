import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Icon, Button, InputNumber } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const { Option } = Select;
let id = 0;

// eslint-disable-next-line
class AddGroupForm extends React.Component {
  handleChange = value => {
    console.log(`selected ${value}`);
  };

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(++id);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { formatMessage } = this.props.intl;

    getFieldDecorator('keys', { initialValue: [] });

    const keys = getFieldValue('keys');

    const suffixScore = getFieldDecorator('score', {
      initialValue: '0',
    })(<InputNumber />);

    const formItems = keys.map((k, index) => (
      <FormItem
        label={index === 0 ? formatMessage(messages.answerLabel) : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            },
          ],
        })(
          <Input
            placeholder="passenger name"
            style={{ width: '60%', marginRight: 8 }}
          />,
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </FormItem>
    ));

    return (
      <Modal
        visible={visible}
        title={formatMessage(messages.addQuestion)}
        okText={formatMessage(messages.addBtn)}
        cancelText={formatMessage(messages.cancelBtn)}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label={formatMessage(messages.nameLabel)}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.nameRequiredMsg),
                },
              ],
            })(<Input placeholder={formatMessage(messages.namePlaceholder)} />)}
          </FormItem>

          <FormItem label={formatMessage(messages.inputTypeLabel)}>
            {getFieldDecorator('inputType', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.inputTypeRequiredMsg),
                },
              ],
            })(
              <Select onChange={this.handleChange}>
                <Option value="radio">Radio</Option>
                <Option value="select">Select</Option>
                <Option value="text-area">Text Area</Option>
                <Option value="rate">Rate</Option>
              </Select>,
            )}
          </FormItem>
          {formItems}
          <FormItem>
            <Button type="dashed" onClick={this.add} style={{ width: '40%' }}>
              <Icon type="plus" />{' '}
              <FormattedMessage {...messages.addAnswerBtn} />
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

AddGroupForm.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create()(injectIntl(AddGroupForm));
