/*
* Author: Duong Han
* HUST
* Survey Messages
*
* This contains all the text for the Survey component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Survey';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Survey component!',
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

  genderLabel: {
    id: `${scope}.genderLabel`,
    defaultMessage: 'Giới tính',
  },

  maleOptions: {
    id: `${scope}.maleOptions`,
    defaultMessage: 'Nam',
  },

  femaleOptions: {
    id: `${scope}.femaleOptions`,
    defaultMessage: 'Nữ',
  },

  ageLabel: {
    id: `${scope}.ageLabel`,
    defaultMessage: 'Tuổi',
  },
});
