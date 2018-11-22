/*
* Author: Duong Han
* HUST
* ResetPassword Messages
*
* This contains all the text for the ResetPassword component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ResetPassword';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Đặt lại mật khẩu',
  },

  title: {
    id: `${scope}.title`,
    defaultMessage: 'Nhập mật khẩu mới',
  },

  password: {
    id: `${scope}.password`,
    defaultMessage: 'Mật khẩu',
  },

  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Xác nhận',
  },

  requiredPassword: {
    id: `${scope}.requiredPassword`,
    defaultMessage: 'Vui lòng nhập mật khẩu',
  },

  validatePassword: {
    id: `${scope}.validatePassword`,
    defaultMessage: 'Vui lòng xác nhận mật khẩu',
  },

  validateLenPassword: {
    id: `${scope}.validateLenPassword`,
    defaultMessage: 'Mật khẩu phải chứa tối thiểu 6 kí tự',
  },

  compareToFirstPassword: {
    id: `${scope}.compareToFirstPassword`,
    defaultMessage: 'Mật khẩu cần nhập giống nhau',
  },

  btnTitle: {
    id: `${scope}.btnTitle`,
    defaultMessage: 'Đặt lại mật khẩu',
  },

  successTitle: {
    id: `${scope}.successTitle`,
    defaultMessage: 'Chúc mừng',
  },
  errorTitle: {
    id: `${scope}.errorTitle`,
    defaultMessage: 'Lỗi',
  },
  successMsg: {
    id: `${scope}.successMsg`,
    defaultMessage:
      'Đổi mật khẩu thành công. Vui lòng đăng nhập để truy cập hệ thống',
  },
  returnLogin: {
    id: `${scope}.returnLogin`,
    defaultMessage: 'Quay lại đăng nhập',
  },
  errorMsg: {
    id: `${scope}.errorMsg`,
    defaultMessage: 'Đổi mật khẩu thất bại.',
  },
});
