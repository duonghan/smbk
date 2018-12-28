import React from 'react';
import { Modal, Form, Radio } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

// eslint-disable-next-line
class GenderSelecModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const { formatMessage } = this.props.intl;

    return (
      <Modal
        visible={visible}
        title={formatMessage(messages.genderSelectTitle)}
        okText="OK"
        cancelText={formatMessage(messages.cancel)}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <p>
          <FormattedMessage {...messages.genderSelectContent} />
        </p>
        <Form layout="vertical">
          <Form.Item>
            {getFieldDecorator('gender', {
              initialValue: 'male',
            })(
              <Radio.Group>
                <Radio value="male">
                  <FormattedMessage {...messages.maleOpt} />
                </Radio>
                <Radio value="female">
                  <FormattedMessage {...messages.femaleOpt} />
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(GenderSelecModal));
