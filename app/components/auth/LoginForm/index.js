import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import Helmet from 'react-helmet';

import Captcha from 'components/auth/Register/Captcha';
import isEmpty from 'utils/validation/isEmpty';
import messages from './messages';

const FormItem = Form.Item;

const Title = styled.h1`
  display: block;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 25px;
`;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      isRemember: true,
      captcha: '',
      captchaInput: '',
      captchaErr: '',
      isCaptcha: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });

    // check captcha
    if (this.state.captcha !== this.state.captchaInput) {
      this.setState({
        captchaErr: 'validateCaptcha',
        loading: false,
      });
      return;
    }

    const user = {
      email: this.state.email,
      password: this.state.password,
      isRemember: this.state.isRemember,
    };

    this.props.onSignIn(user);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      captchaErr: '',
    });

    if (this.state.loading) {
      this.setState({ loading: false });
    }
  };

  toggleRemember = e => {
    this.setState({ isRemember: e.target.checked });
  };

  // Router to right page follow role of user
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.get('isAuthorized')) {
      return nextProps.history.push('/');
    }
    if (
      nextProps.errors.get('email') ||
      nextProps.errors.get('confirmed') ||
      nextProps.errors.get('password')
    ) {
      this.setState({ isCaptcha: true });
    }
    return null;
  }

  result = text => {
    this.setState({
      captcha: text,
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { errors } = this.props;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16, offset: 4 },
        md: { span: 8, offset: 8 },
      },
    };

    return (
      <Row>
        <Helmet title={formatMessage(messages.header)} />

        <Title>
          <FormattedMessage {...messages.title} />
        </Title>

        <Col>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              hasFeedback
              validateStatus={
                (errors.get('email') || errors.get('confirmed')) && 'error'
              }
              help={
                (errors.get('email') &&
                  formatMessage(messages[errors.get('email')])) ||
                (errors.get('confirmed') &&
                  formatMessage(messages[errors.get('confirmed')]))
              }
            >
              <Input
                prefix={<Icon type="mail" theme="twoTone" />}
                placeholder={formatMessage(messages.email)}
                value={this.state.email}
                onChange={this.onChange}
                name="email"
              />
            </FormItem>

            <FormItem
              {...formItemLayout}
              hasFeedback
              validateStatus={errors.get('password') && 'error'}
              help={
                errors.get('password') &&
                formatMessage(messages[errors.get('password')])
              }
            >
              <Input
                prefix={<Icon type="lock" theme="twoTone" />}
                type="password"
                placeholder={formatMessage(messages.password)}
                value={this.state.password}
                onChange={this.onChange}
                name="password"
              />
            </FormItem>
            {this.state.isCaptcha && (
              <FormItem
                {...formItemLayout}
                extra={formatMessage(messages.extraCaptcha)}
                hasFeedback
                validateStatus={this.state.captchaErr && 'error'}
                help={
                  this.state.captchaErr &&
                  formatMessage(messages[this.state.captchaErr])
                }
              >
                <Captcha
                  result={this.result}
                  toggleRefresh={this.state.refreshCaptcha}
                />
                <Input
                  name="captchaInput"
                  placeholder={formatMessage(messages.captcha)}
                  value={this.state.captchaInput}
                  onChange={this.onChange}
                />
              </FormItem>
            )}

            <FormItem {...formItemLayout}>
              <Checkbox
                checked={this.state.isRemember}
                onChange={this.toggleRemember}
              >
                <FormattedMessage {...messages.remember} />
              </Checkbox>

              <Link to="/auth/forgot-password">
                <FormattedMessage {...messages.forgotPassword} />
              </Link>
            </FormItem>

            <FormItem {...formItemLayout}>
              <Button
                loading={
                  isEmpty(errors.get('email')) &&
                  (isEmpty(errors.get('password')) && this.state.loading)
                }
                type="primary"
                htmlType="submit"
                disabled={this.state.email === '' || this.state.password === ''}
              >
                <FormattedMessage {...messages.login} />
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.object,
  intl: intlShape.isRequired,
  onSignIn: PropTypes.func,
};

export default Form.create()(injectIntl(LoginForm));
