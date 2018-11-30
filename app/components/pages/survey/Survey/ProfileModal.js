import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio } from 'antd';

const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
class ProfileModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input the title of collection!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('description')(<Input type="textarea" />)}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
              initialValue: 'public',
            })(
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

ProfileModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create()(ProfileModal);
