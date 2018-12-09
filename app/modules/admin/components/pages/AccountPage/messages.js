/*
 * Admin Messages
 *
 * This contains all the text for the Admin component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.modules.admin.components.AccountPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Trang quản trị',
  },

  clearFiltersBtn: {
    id: `${scope}.clearFiltersBtn`,
    defaultMessage: 'Xóa bộ lọc',
  },

  clearFiltersSortedBtn: {
    id: `${scope}.clearFiltersSortedBtn`,
    defaultMessage: 'Xóa bộ lọc và sắp xếp',
  },

  searchInput: {
    id: `${scope}.searchInput`,
    defaultMessage: 'Tìm kiếm',
  },

  nameTitle: {
    id: `${scope}.nameTitle`,
    defaultMessage: 'Họ tên',
  },

  roleTitle: {
    id: `${scope}.roleTitle`,
    defaultMessage: 'Loại tài khoản',
  },

  dateTitle: {
    id: `${scope}.dateTitle`,
    defaultMessage: 'Ngày tham gia',
  },

  actionTitle: {
    id: `${scope}.actionTitle`,
    defaultMessage: 'Hành động',
  },

  editToolTip: {
    id: `${scope}.editToolTip`,
    defaultMessage: 'Sửa',
  },

  deleteToolTip: {
    id: `${scope}.deleteToolTip`,
    defaultMessage: 'Xóa',
  },

  selectedTextFirst: {
    id: `${scope}.selectedTextFirst`,
    defaultMessage: 'Đã chọn',
  },

  selectedTextLast: {
    id: `${scope}.selectedTextLast`,
    defaultMessage: 'tài khoản',
  },

  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Hủy',
  },

  save: {
    id: `${scope}.save`,
    defaultMessage: 'Lưu',
  },

  default: {
    id: `${scope}.default`,
    defaultMessage: 'Người dùng',
  },

  guest: {
    id: `${scope}.guest`,
    defaultMessage: 'Khách',
  },

  admin: {
    id: `${scope}.admin`,
    defaultMessage: 'Quản trị viên',
  },

  reset: {
    id: `${scope}.reset`,
    defaultMessage: 'Khôi phục mặc định',
  },

  rulesMsg: {
    id: `${scope}.rulesMsg`,
    defaultMessage: 'Làm ơn nhập',
  },

  cancelPromtMsg: {
    id: `${scope}.cancelPromtMsg`,
    defaultMessage: 'Bạn chắc chắn muốn hủy?',
  },

  deletePromtMsg: {
    id: `${scope}.deletePromtMsg`,
    defaultMessage: 'Bạn chắc chắn muốn xóa?',
  },
});
