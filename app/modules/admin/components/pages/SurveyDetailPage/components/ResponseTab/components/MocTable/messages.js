/*
* Author: Duong Han
* HUST
* MocTable Messages
*
* This contains all the text for the MocTable component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MocTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Danh sách phản hồi',
  },

  profileLabel: {
    id: `${scope}.profileLabel`,
    defaultMessage: 'Người tham gia',
  },

  profileModalTitle: {
    id: `${scope}.profileModalTitle`,
    defaultMessage: 'Thông tin cá nhân',
  },

  rulesMsg: {
    id: `${scope}.rulesMsg`,
    defaultMessage: 'Vui lòng nhập',
  },

  viewToolTip: {
    id: `${scope}.viewToolTip`,
    defaultMessage: 'Xem thông tin',
  },

  deleteToolTip: {
    id: `${scope}.deleteToolTip`,
    defaultMessage: 'Xóa',
  },

  detailToolTip: {
    id: `${scope}.detailToolTip`,
    defaultMessage: 'Chi tiết',
  },

  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Hủy',
  },

  actionTitle: {
    id: `${scope}.actionTitle`,
    defaultMessage: 'Hành động',
  },

  save: {
    id: `${scope}.save`,
    defaultMessage: 'Lưu',
  },

  cancelPromtMsg: {
    id: `${scope}.cancelPromtMsg`,
    defaultMessage: 'Bạn chắc chắn muốn hủy?',
  },

  deletePromtMsg: {
    id: `${scope}.deletePromtMsg`,
    defaultMessage: 'Bạn chắc chắn muốn xóa?',
  },

  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Họ tên',
  },

  workUnitLabel: {
    id: `${scope}.workUnitLabel`,
    defaultMessage: 'Đơn vị công tác',
  },

  positionLabel: {
    id: `${scope}.positionLabel`,
    defaultMessage: 'Chức vụ/nghề nghiệp',
  },

  mainTaskLabel: {
    id: `${scope}.mainTaskLabel`,
    defaultMessage: 'Công việc/nhiệm vụ chính được phân công',
  },

  specialityLabel: {
    id: `${scope}.specialityLabel`,
    defaultMessage: 'Chuyên môn chính được đào tạo',
  },

  personalEmailLabel: {
    id: `${scope}.personalEmailLabel`,
    defaultMessage: 'Email cá nhân',
  },

  phoneLabel: {
    id: `${scope}.phoneLabel`,
    defaultMessage: 'Số điện thoại',
  },
});
