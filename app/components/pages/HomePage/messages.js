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

  requiredNameMsg: {
    id: `${scope}.requiredNameMsg`,
    defaultMessage: 'Vui lòng nhập họ tên',
  },

  workUnitLabel: {
    id: `${scope}.workUnitLabel`,
    defaultMessage: 'Đơn vị công tác',
  },

  requiredWorkUnitMsg: {
    id: `${scope}.requiredWorkUnitMsg`,
    defaultMessage: 'Vui lòng nhập đơn vị công tác',
  },

  positionLabel: {
    id: `${scope}.positionLabel`,
    defaultMessage: 'Chức vụ/nghề nghiệp',
  },

  requiredPositionMsg: {
    id: `${scope}.requiredPositionMsg`,
    defaultMessage: 'Vui lòng nhập chức vụ/nghề nghiệp',
  },

  mainTaskLabel: {
    id: `${scope}.mainTaskLabel`,
    defaultMessage: 'Công việc/nhiệm vụ chính được phân công',
  },

  requiredMainTaskMsg: {
    id: `${scope}.requiredMainTaskMsg`,
    defaultMessage: 'Vui lòng nhập công việc/nhiệm vụ chính được phân công',
  },

  specialityLabel: {
    id: `${scope}.specialityLabel`,
    defaultMessage: 'Chuyên môn chính được đào tạo',
  },

  personalEmailLabel: {
    id: `${scope}.personalEmailLabel`,
    defaultMessage: 'Email cá nhân',
  },

  requiredPersonalEmailMsg: {
    id: `${scope}.requiredPersonalEmailMsg`,
    defaultMessage: 'Vui lòng nhập email cá nhân',
  },

  validatePersonalEmailMsg: {
    id: `${scope}.validatePersonalEmailMsg`,
    defaultMessage: 'Email không hợp lệ',
  },

  phoneLabel: {
    id: `${scope}.phoneLabel`,
    defaultMessage: 'Số điện thoại',
  },

  requiredPhoneMsg: {
    id: `${scope}.requiredPhoneMsg`,
    defaultMessage: 'Vui lòng nhập số điện thoại',
  },

  validatePhoneMsg: {
    id: `${scope}.validatePhoneMsg`,
    defaultMessage: 'Số điện thoại không hợp lệ',
  },
});
