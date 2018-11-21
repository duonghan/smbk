import React from 'react';
import { Modal } from 'antd';

import PropTypes from 'prop-types';
import ChangePassForm from './ChangePassForm';
class ChangePassModal extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: this.props.visible,
    confirmLoading: false,
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;

    return (
      <div>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>
            <ChangePassForm />
          </p>
        </Modal>
      </div>
    );
  }
}

ChangePassModal.propTypes = {
  visible: PropTypes.bool,
};

export default ChangePassModal;
