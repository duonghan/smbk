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

  genderSelectTitle: {
    id: `${scope}.genderSelectTitle`,
    defaultMessage: 'Chọn giới tính',
  },

  genderSelectContent: {
    id: `${scope}.genderSelectContent`,
    defaultMessage: 'Để kết quả được tốt nhất, vui lòng chọn giới tính của bạn',
  },

  maleOpt: {
    id: `${scope}.maleOpt`,
    defaultMessage: 'Nam',
  },

  femaleOpt: {
    id: `${scope}.femaleOpt`,
    defaultMessage: 'Nữ',
  },

  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Hủy',
  },
});
