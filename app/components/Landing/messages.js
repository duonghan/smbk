/*
 * Landing Messages
 *
 * This contains all the text for the Landing component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Landing';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Landing component !',
  },
  introduce: {
    id: `${scope}.introduce`,
    defaultMessage: 'Chào mừng đến với hệ thống quản lý khảo sát SMBK',
  },
  explore: {
    id: `${scope}.explore`,
    defaultMessage: 'Khám phá',
  },
  guestLogin: {
    id: `${scope}.guestLogin`,
    defaultMessage: 'Đăng nhập với tư cách khách',
  },
  signup: {
    id: `${scope}.signup`,
    defaultMessage: 'Đăng ký',
  },
  withoutLogin: {
    id: `${scope}.withoutLogin`,
    defaultMessage: 'Tiếp tục mà không cần đăng nhập',
  },
});
