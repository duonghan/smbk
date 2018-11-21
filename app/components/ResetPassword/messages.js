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
  btnTitle: {
    id: `${scope}.btnTitle`,
    defaultMessage: 'Đặt lại mật khẩu',
  },
});
