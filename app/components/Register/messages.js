/*
 * SignupForm Messages
 *
 * This contains all the text for the SignupForm component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.SignupForm.header',
    defaultMessage: 'This is the SignupForm component !',
  },

  name: {
    id: 'app.components.SignupForm.name',
    defaultMessage: 'Họ tên ',
  },

  submitBtn: {
    id: 'app.components.SignupForm.submitBtn',
    defaultMessage: 'Đăng ký',
  },

  title: {
    id: 'app.components.SignupForm.title',
    defaultMessage: 'Đăng ký',
  },

  validateEmail: {
    id: 'app.components.SignupForm.validateEmail',
    defaultMessage: 'Email đã nhập không hợp lệ',
  },

  requiredEmail: {
    id: 'app.components.SignupForm.requiredEmail',
    defaultMessage: 'Vui lòng nhập email',
  },

  existedEmail: {
    id: 'app.components.SignupForm.existedEmail',
    defaultMessage: 'Email đã tồn tại',
  },

  titleName: {
    id: 'app.components.SignupForm.titleName',
    defaultMessage: 'Nhập họ tên của bạn: Họ trước, tên sau',
  },

  labelPassword: {
    id: 'app.components.SignupForm.labelPassword',
    defaultMessage: 'Nhập mật khẩu',
  },

  requiredPassword: {
    id: 'app.components.SignupForm.requiredPassword',
    defaultMessage: 'Vui lòng nhập mật khẩu',
  },

  validatePassword: {
    id: 'app.components.SignupForm.validatePassword',
    defaultMessage: 'Mật khẩu phải chứa tối thiểu 6 kí tự',
  },

  requiredPassword2: {
    id: 'app.components.SignupForm.requiredPassword2',
    defaultMessage: 'Vui lòng xác nhận mật khẩu',
  },

  validatePassword2: {
    id: 'app.components.SignupForm.validatePassword2',
    defaultMessage: 'Mật khẩu không khớp',
  },

  labelPassword2: {
    id: 'app.components.SignupForm.labelPassword2',
    defaultMessage: 'Xác nhận mật khẩu',
  },

  validateCaptcha: {
    id: 'app.components.SignupForm.validateCaptcha',
    defaultMessage: 'Captcha không khớp',
  },

  requiredName: {
    id: 'app.components.SignupForm.requiredName',
    defaultMessage: 'Vui lòng nhập họ tên đầy đủ của bạn',
  },

  validateName: {
    id: 'app.components.SignupForm.validateName',
    defaultMessage: 'Tên phải chứa từ 2 đến 30 kí tự',
  },

  extraCaptcha: {
    id: 'app.components.SignupForm.extraCaptcha',
    defaultMessage: 'Chúng tôi muốn đảm bảo bạn không phải robot.',
  },

  requiredCaptcha: {
    id: 'app.components.SignupForm.requiredCaptcha',
    defaultMessage: 'Vui lòng nhập captcha',
  },

  validateErrorTitle: {
    id: 'app.components.SignupForm.validateErrorTitle',
    defaultMessage: 'Đăng ký thất bại',
  },

  resigterSuccessTitle: {
    id: 'app.components.SignupForm.resigterSuccessTitle',
    defaultMessage: 'Đăng ký thành công',
  },

  resigterSuccessContentBefore: {
    id: 'app.components.SignupForm.resigterSuccessContentBefore',
    defaultMessage: 'Chúc mừng ',
  },

  resigterSuccessContentAfter: {
    id: 'app.components.SignupForm.resigterSuccessContentAfter',
    defaultMessage:
      ' đã đăng ký thành công. Email xác nhận đã được gửi đến địa chỉ email đăng ký của bạn. Vui lòng kiểm tra hộp thư đến để xác nhận email.',
  },
});
