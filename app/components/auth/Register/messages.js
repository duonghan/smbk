/*
 * SignupForm Messages
 *
 * This contains all the text for the SignupForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SignupForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SignupForm component !',
  },

  name: {
    id: `${scope}.name`,
    defaultMessage: 'Họ tên ',
  },

  submitBtn: {
    id: `${scope}.submitBtn`,
    defaultMessage: 'Đăng ký',
  },

  title: {
    id: `${scope}.title`,
    defaultMessage: 'Đăng ký',
  },

  validateEmail: {
    id: `${scope}.validateEmail`,
    defaultMessage: 'Email đã nhập không hợp lệ',
  },

  requiredEmail: {
    id: `${scope}.requiredEmail`,
    defaultMessage: 'Vui lòng nhập email',
  },

  existedEmail: {
    id: `${scope}.existedEmail`,
    defaultMessage: 'Email đã tồn tại',
  },

  titleName: {
    id: `${scope}.titleName`,
    defaultMessage: 'Nhập họ tên của bạn: Họ trước, tên sau',
  },

  labelPassword: {
    id: `${scope}.labelPassword`,
    defaultMessage: 'Nhập mật khẩu',
  },

  requiredPassword: {
    id: `${scope}.requiredPassword`,
    defaultMessage: 'Vui lòng nhập mật khẩu',
  },

  validatePassword: {
    id: `${scope}.validatePassword`,
    defaultMessage: 'Mật khẩu phải chứa tối thiểu 6 kí tự',
  },

  requiredPassword2: {
    id: `${scope}.requiredPassword2`,
    defaultMessage: 'Vui lòng xác nhận mật khẩu',
  },

  validatePassword2: {
    id: `${scope}.validatePassword2`,
    defaultMessage: 'Mật khẩu không khớp',
  },

  labelPassword2: {
    id: `${scope}.labelPassword2`,
    defaultMessage: 'Xác nhận mật khẩu',
  },

  validateCaptcha: {
    id: `${scope}.validateCaptcha`,
    defaultMessage: 'Captcha không khớp',
  },

  requiredName: {
    id: `${scope}.requiredName`,
    defaultMessage: 'Vui lòng nhập họ tên đầy đủ của bạn',
  },

  validateName: {
    id: `${scope}.validateName`,
    defaultMessage: 'Tên phải chứa từ 2 đến 30 kí tự',
  },

  extraCaptcha: {
    id: `${scope}.extraCaptcha`,
    defaultMessage: 'Chúng tôi muốn đảm bảo bạn không phải robot.',
  },

  requiredCaptcha: {
    id: `${scope}.requiredCaptcha`,
    defaultMessage: 'Vui lòng nhập captcha',
  },

  validateErrorTitle: {
    id: `${scope}.validateErrorTitle`,
    defaultMessage: 'Đăng ký thất bại',
  },

  resigterSuccessTitle: {
    id: `${scope}.resigterSuccessTitle`,
    defaultMessage: 'Đăng ký thành công',
  },

  resigterSuccessContentBefore: {
    id: `${scope}.resigterSuccessContentBefore`,
    defaultMessage: 'Chúc mừng ',
  },

  resigterSuccessContentAfter: {
    id: `${scope}.resigterSuccessContentAfter`,
    defaultMessage:
      ' đã đăng ký thành công. Email xác nhận đã được gửi đến địa chỉ email đăng ký của bạn. Vui lòng kiểm tra hộp thư đến để xác nhận email.',
  },
});
