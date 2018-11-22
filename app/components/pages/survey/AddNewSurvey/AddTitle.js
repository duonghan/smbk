import React from 'react';
import PropTypes from 'prop-types';
import { Input, Divider, Row, Col } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

class AddTitlleForm extends React.PureComponent {
  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Row type="flex" align="top" justify="center">
        <Divider>
          <FormattedMessage {...messages.addTitlle} />
        </Divider>
        <Col xs={20} sm={18} md={12} lg={10} xl={8}>
          <Input
            onChange={this.props.onChange}
            value={this.props.title}
            placeholder={formatMessage(messages.addTitllePlcHolder)}
          />
        </Col>
      </Row>
    );
  }
}

AddTitlleForm.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default injectIntl(AddTitlleForm);
