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
    defaultMessage: 'Danh sách tài khoản',
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

  genderTitle: {
    id: `${scope}.genderTitle`,
    defaultMessage: 'Giới tính',
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

  add: {
    id: `${scope}.add`,
    defaultMessage: 'Thêm tài khoản mới',
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

  male: {
    id: `${scope}.male`,
    defaultMessage: 'Nam',
  },

  female: {
    id: `${scope}.female`,
    defaultMessage: 'Nữ',
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

  successTitle: {
    id: `${scope}.successTitle`,
    defaultMessage: 'Thành công',
  },

  updateSuccessContent: {
    id: `${scope}.updateSuccessContent`,
    defaultMessage: 'Cập nhật thông tin người dùng thành công',
  },

  deleteSuccessContent: {
    id: `${scope}.deleteSuccessContent`,
    defaultMessage: 'Xóa người dùng thành công',
  },

  // form fields

  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Mật khẩu',
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

  requiredPassword: {
    id: `${scope}.requiredPassword`,
    defaultMessage: 'Vui lòng nhập mật khẩu',
  },

  validatePassword: {
    id: `${scope}.validatePassword`,
    defaultMessage: 'Mật khẩu phải chứa tối thiểu 6 kí tự',
  },

  validateName: {
    id: `${scope}.validateName`,
    defaultMessage: 'Tên phải chứa từ 2 đến 30 kí tự',
  },

  addUserSuccessMsg: {
    id: `${scope}.addUserSuccessMsg`,
    defaultMessage: 'Thêm tài khoản thành công',
  },

  addUserFailedMsg: {
    id: `${scope}.addUserFailedMsg`,
    defaultMessage: 'Thêm tài khoản thất bại',
  },

  updateAccount: {
    id: `${scope}.updateAccount`,
    defaultMessage: 'Cập nhật tài khoản',
  },

  resetPasswordLabel: {
    id: `${scope}.resetPasswordLabel`,
    defaultMessage: 'Khôi phục mật khẩu mặc định',
  },
});
