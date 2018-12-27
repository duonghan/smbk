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

  submitBtn: {
    id: `${scope}.submitBtn`,
    defaultMessage: 'Gửi',
  },

  errMessage: {
    id: `${scope}.errMessage`,
    defaultMessage: 'Bạn vui lòng hoàn thành toàn bộ câu hỏi',
  },
});
