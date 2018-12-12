import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Input,
  Select,
  Icon,
  Button,
  InputNumber,
  Radio,
} from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const { Option } = Select;
const RadioGroup = Radio.Group;
let id = 0;

// eslint-disable-next-line
class AddGroupForm extends React.Component {
  state = {
    current: 'radio',
  };

  handleChange = value => {
    this.setState({ current: value });

    console.log(`selected ${value}`, this.state.isTextArea);
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
    const nextKeys = keys.concat((id += 1));
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

    const formItems = keys.map((k, index) => (
      <FormItem
        label={index === 0 ? formatMessage(messages.answerLabel) : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`optionAnswers[${k}]`, {
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
            placeholder="answer name"
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
              initialValue: 'radio',
            })(
              <Select onChange={this.handleChange}>
                <Option value="radio">Radio</Option>
                <Option value="select">Select</Option>
                <Option value="text-area">Text Area</Option>
                <Option value="rate">Rate</Option>
              </Select>,
            )}
          </FormItem>

          {(this.state.current === 'radio' ||
            this.state.current === 'select') && (
            <div>
              {formItems}
              <FormItem>
                <Button
                  type="dashed"
                  onClick={this.add}
                  style={{ width: '40%' }}
                >
                  <Icon type="plus" />{' '}
                  <FormattedMessage {...messages.addAnswerBtn} />
                </Button>
              </FormItem>
            </div>
          )}

          {this.state.current === 'rate' && (
            <div>
              <FormItem label={formatMessage(messages.lowerLabel)}>
                {getFieldDecorator('lower', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.lowerLabel),
                    },
                  ],
                })(<Input />)}
              </FormItem>

              <FormItem label={formatMessage(messages.upperLabel)}>
                {getFieldDecorator('upper', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.upperLabel),
                    },
                  ],
                })(<Input />)}
              </FormItem>

              <FormItem label={formatMessage(messages.rangeLabel)}>
                {getFieldDecorator('range', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.nameRequiredMsg),
                    },
                  ],
                })(<InputNumber min={0} />)}
              </FormItem>
            </div>
          )}
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
