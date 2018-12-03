/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Trang chủ',
  },

  profileTitle: {
    id: `${scope}.profileTitle`,
    defaultMessage: 'Nhập thông tin cá nhân',
  },

  saveBtn: {
    id: `${scope}.saveBtn`,
    defaultMessage: 'Lưu lại',
  },

  cancelBtn: {
    id: `${scope}.cancelBtn`,
    defaultMessage: 'Trở về',
  },

  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Họ tên',
  },

  addressLabel: {
    id: `${scope}.addressLabel`,
    defaultMessage: 'Địa chỉ',
  },
});
