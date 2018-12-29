/**
 *
 * SignupForm
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Form, Input, Tooltip, Button, Modal, Radio } from 'antd';
import { withRouter } from 'react-router';
import Captcha from './Captcha';
import messages from './messages';
import * as styles from './styles';

const FormItem = Form.Item;

const Title = styled.h1`
  display: block;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 25px;
`;

const initialState = {
  loading: false,
  captcha: '',
  captchaInput: '',
  refreshCaptcha: false,
  name: '',
  email: '',
  password: '',
  password2: '',
  gender: 'male',
  errors: {},
};

/* eslint-disable react/prefer-stateless-function */
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.formatMessage = this.props.intl.formatMessage;
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    // check captcha
    if (this.state.captcha !== this.state.captchaInput) {
      this.setState({ errors: { captcha: 'validateCaptcha' }, loading: false });
      return;
    }

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      gender: this.state.gender,
      password: this.state.password,
      password2: this.state.password2,
    };

    axios
      .post('/api/users/register', newUser)
      .then(res => {
        Modal.success({
          title: this.formatMessage(messages.resigterSuccessTitle),
          content:
            this.formatMessage(messages.resigterSuccessContentBefore) +
            res.data.name +
            this.formatMessage(messages.resigterSuccessContentAfter),
        });
        this.setState(initialState);
        this.props.history.push('/login');
      })
      .catch(err =>
        this.setState({
          errors: err.response.data,
          refreshCaptcha: true,
          loading: false,
        }),
      );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  };

  result = text => {
    this.setState({
      captcha: text,
    });
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <h1>{user && user.get('name')}</h1>

        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...styles.formItemLayout}
            label="E-mail"
            hasFeedback
            validateStatus={this.state.errors.email && 'error'}
            help={
              this.state.errors.email &&
              this.formatMessage(messages[this.state.errors.email])
            }
          >
            <Input
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </FormItem>

          <FormItem
            {...styles.formItemLayout}
            label={this.formatMessage(messages.labelPassword)}
            validateStatus={this.state.errors.password && 'error'}
            help={
              this.state.errors.password &&
              this.formatMessage(messages[this.state.errors.password])
            }
          >
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </FormItem>

          <FormItem
            {...styles.formItemLayout}
            label={this.formatMessage(messages.labelPassword2)}
            hasFeedback
            validateStatus={this.state.errors.password2 && 'error'}
            help={
              this.state.errors.password2 &&
              this.formatMessage(messages[this.state.errors.password2])
            }
          >
            <Input
              type="password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
            />
          </FormItem>

          <FormItem
            {...styles.formItemLayout}
            label={
              <Tooltip title={this.formatMessage(messages.titleName)}>
                <span>
                  <FormattedMessage {...messages.name} />
                </span>
              </Tooltip>
            }
            hasFeedback
            validateStatus={this.state.errors.name && 'error'}
            help={
              this.state.errors.name &&
              this.formatMessage(messages[this.state.errors.name])
            }
          >
            <Input
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </FormItem>

          <FormItem
            {...styles.formItemLayout}
            label={
              <Tooltip title={this.formatMessage(messages.titleGender)}>
                <span>
                  <FormattedMessage {...messages.gender} />
                </span>
              </Tooltip>
            }
          >
            <Radio.Group
              defaultValue="male"
              name="gender"
              onChange={this.onChange}
            >
              <Radio value="male">
                <FormattedMessage {...messages.maleOpt} />
              </Radio>

              <Radio value="female">
                <FormattedMessage {...messages.femaleOpt} />
              </Radio>
            </Radio.Group>
          </FormItem>

          <FormItem
            {...styles.formItemLayout}
            label="Captcha"
            extra={this.formatMessage(messages.extraCaptcha)}
            hasFeedback
            validateStatus={this.state.errors.captcha && 'error'}
            help={
              this.state.errors.captcha &&
              this.formatMessage(messages[this.state.errors.captcha])
            }
          >
            <Captcha
              result={this.result}
              toggleRefresh={this.state.refreshCaptcha}
            />
            <Input
              name="captchaInput"
              value={this.state.captchaInput}
              onChange={this.onChange}
            />
          </FormItem>

          <FormItem {...styles.tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              <FormattedMessage {...messages.submitBtn} />
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  form: PropTypes.object,
  intl: intlShape.isRequired,
};

export default withRouter(injectIntl(SignupForm));
