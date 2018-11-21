/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LoginForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LoginForm component !',
  },

  title: {
    id: `${scope}.title`,
    defaultMessage: 'Đăng nhập',
  },

  email: {
    id: `${scope}.email`,
    defaultMessage: 'Nhập email',
  },

  password: {
    id: `${scope}.password`,
    defaultMessage: 'Mật khẩu',
  },

  captcha: {
    id: `${scope}.captcha`,
    defaultMessage: 'Xác nhận captcha',
  },

  remember: {
    id: `${scope}.remember`,
    defaultMessage: 'Duy trì đăng nhập',
  },

  forgotPassword: {
    id: `${scope}.forgotPassword`,
    defaultMessage: 'Quên mật khẩu',
  },

  login: {
    id: `${scope}.login`,
    defaultMessage: 'Đăng nhập',
  },

  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'Email không hợp lệ',
  },

  requiredEmail: {
    id: `${scope}.requiredEmail`,
    defaultMessage: 'Vui lòng nhập email',
  },

  notfoundEmail: {
    id: `${scope}.notfoundEmail`,
    defaultMessage: 'Tài khoản không tồn tại',
  },

  confirmEmail: {
    id: `${scope}.confirmEmail`,
    defaultMessage: 'Vui lòng xác nhận email để tiếp tục',
  },

  requiredPassword: {
    id: `${scope}.requiredPassword`,
    defaultMessage: 'Vui lòng nhâp mật khẩu',
  },

  incorrectPassword: {
    id: `${scope}.incorrectPassword`,
    defaultMessage: 'Mật khẩu không đúng',
  },

  extraCaptcha: {
    id: `${scope}.extraCaptcha`,
    defaultMessage: 'Chúng tôi muốn đảm bảo bạn không phải robot.',
  },

  requiredCaptcha: {
    id: `${scope}.requiredCaptcha`,
    defaultMessage: 'Vui lòng nhập captcha',
  },

  validateCaptcha: {
    id: `${scope}.validateCaptcha`,
    defaultMessage: 'Captcha không khớp',
  },
});
