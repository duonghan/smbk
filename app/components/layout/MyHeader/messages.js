/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MyHeader';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Header component !',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Đăng nhập',
  },
  signup: {
    id: `${scope}.signup`,
    defaultMessage: 'Đăng ký',
  },
  account: {
    id: `${scope}.main.header.account`,
    defaultMessage: 'Tài khoản',
  },
  setting: {
    id: `${scope}.main.header.account.setting`,
    defaultMessage: 'Thiết lập',
  },
  changePass: {
    id: `${scope}.main.header.account.changePass`,
    defaultMessage: 'Đổi mật khẩu',
  },
  changeInfo: {
    id: `${scope}.main.header.account.changeInfo`,
    defaultMessage: 'Cập nhật thông tin',
  },
  logout: {
    id: `${scope}.main.header.account.logout`,
    defaultMessage: 'Đăng xuất',
  },
  changeLang: {
    id: `${scope}.main.header.account.changeLang`,
    defaultMessage: 'Thay đổi ngôn ngữ',
  },
  home: {
    id: `${scope}.main.sidebar.menu.home`,
    defaultMessage: 'Trang chủ',
  },
  add: {
    id: `${scope}.main.sidebar.menu.add`,
    defaultMessage: 'Thêm mới',
  },
  manager: {
    id: `${scope}.main.sidebar.menu.manager`,
    defaultMessage: 'Quản lý khảo sát',
  },
  report: {
    id: `${scope}.main.sidebar.menu.report`,
    defaultMessage: 'Báo cáo',
  },
});
