/*
* Author: Duong Han
* HUST
* ForgotPassword Messages
*
* This contains all the text for the ForgotPassword component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ForgotPassword';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Quên mật khẩu',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Tìm kiếm tài khoản của bạn',
  },
  plcEmail: {
    id: `${scope}.plcEmail`,
    defaultMessage: 'Nhập địa chỉ email của bạn ở đây',
  },
  successTitle: {
    id: `${scope}.successTitle`,
    defaultMessage: 'Xác thực email thành công',
  },
  errorTitle: {
    id: `${scope}.errorTitle`,
    defaultMessage: 'Lỗi',
  },
  successMsg: {
    id: `${scope}.successMsg`,
    defaultMessage:
      'Email chứa đường dẫn khôi phục mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến.',
  },
  errorMsg: {
    id: `${scope}.errorMsg`,
    defaultMessage:
      'Rất tiếc. Email này không tồn tại trên hệ thống. Bạn vui lòng kiểm tra lại.',
  },
});
