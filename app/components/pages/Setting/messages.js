/*
* Author: Duong Han
* HUST
* Setting Messages
*
* This contains all the text for the Setting component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Setting';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Thiết lập',
  },

  title: {
    id: `${scope}.title`,
    defaultMessage: 'Cập nhật thông tin',
  },

  name: {
    id: `${scope}.name`,
    defaultMessage: 'Họ tên',
  },

  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Đổi mật khẩu',
  },

  currentPassword: {
    id: `${scope}.currentPassword`,
    defaultMessage: 'Nhập mật khẩu hiện tại',
  },

  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Nhập mật khẩu mới',
  },

  requiredCurrentPassword: {
    id: `${scope}.requiredCurrentPassword`,
    defaultMessage: 'Vui lòng nhập mật khẩu hiện tại',
  },

  incorrectCurrentPassword: {
    id: `${scope}.incorrectCurrentPassword`,
    defaultMessage: 'Mật khẩu hiện tại không đúng',
  },

  requiredNewPassword: {
    id: `${scope}.requiredNewPassword`,
    defaultMessage: 'Vui lòng nhập mật khẩu mới',
  },

  validatePassword: {
    id: `${scope}.validatePassword`,
    defaultMessage: 'Mật khẩu phải chứa tối thiểu 6 kí tự',
  },

  requiredPassword2: {
    id: `${scope}.requiredPassword2`,
    defaultMessage: 'Vui lòng xác nhận mật khẩu mới',
  },

  validatePassword2: {
    id: `${scope}.validatePassword2`,
    defaultMessage: 'Mật khẩu mới không khớp',
  },

  labelPassword2: {
    id: `${scope}.labelPassword2`,
    defaultMessage: 'Xác nhận mật khẩu mới',
  },

  validateEmail: {
    id: `${scope}.validateEmail`,
    defaultMessage: 'Email đã nhập không hợp lệ',
  },

  requiredEmail: {
    id: `${scope}.requiredEmail`,
    defaultMessage: 'Vui lòng nhập email',
  },

  validateName: {
    id: `${scope}.validateName`,
    defaultMessage: 'Tên phải chứa từ 2 đến 30 kí tự',
  },

  requiredName: {
    id: `${scope}.requiredName`,
    defaultMessage: 'Vui lòng nhập họ tên đầy đủ của bạn',
  },

  btnSubmit: {
    id: `${scope}.btnSubmit`,
    defaultMessage: 'Cập nhật',
  },

  updateSuccessLabel: {
    id: `${scope}.updateSuccessLabel`,
    defaultMessage: 'Thành công',
  },

  updateFailedLabel: {
    id: `${scope}.updateFailedLabel`,
    defaultMessage: 'Lỗi',
  },

  updateSuccessContent: {
    id: `${scope}.updateSuccessContent`,
    defaultMessage:
      'Cập nhật thông tin thành công, vui lòng quay lại trang chủ để tiếp tục',
  },
});
