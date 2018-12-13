/*
* Author: Duong Han
* HUST
* ResultPage Messages
*
* This contains all the text for the ResultPage component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ResultPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Kết quả',
  },

  thanks: {
    id: `${scope}.thanks`,
    defaultMessage: 'Cảm ơn bạn đã tham gia khảo sát',
  },

  resultTitle: {
    id: `${scope}.resultTitle`,
    defaultMessage: 'KẾT QUẢ KHẢO SÁT',
  },

  selectGenderLabel: {
    id: `${scope}.selectGenderLabel`,
    defaultMessage: 'Vui lòng chọn giới tính của bạn',
  },

  maleOpt: {
    id: `${scope}.maleOpt`,
    defaultMessage: 'Nam',
  },

  femaleOpt: {
    id: `${scope}.femaleOpt`,
    defaultMessage: 'Nữ',
  },

  backHomeBtn: {
    id: `${scope}.backHomeBtn`,
    defaultMessage: 'Về trang chủ',
  },
});
