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

  riasecEntrytTitleBegin: {
    id: `${scope}.riasecEntrytTitleBegin`,
    defaultMessage: 'Theo kết quả đánh giá, bạn vượt trội ở lĩnh vực',
  },

  riasecEntrytConjTitle: {
    id: `${scope}.riasecEntrytConjTitle`,
    defaultMessage: 'và lĩnh vực',
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

  psychologicNameLabel: {
    id: `${scope}.psychologicNameLabel`,
    defaultMessage: 'Kiểu tâm lý',
  },

  psychologicLevelLabel: {
    id: `${scope}.psychologicLevelLabel`,
    defaultMessage: 'Mức độ khó khăn',
  },

  yAxesLabel: {
    id: `${scope}.yAxesLabel`,
    defaultMessage: 'Điểm số',
  },

  xAxesLabel: {
    id: `${scope}.xAxesLabel`,
    defaultMessage: 'Số thứ tự',
  },

  upperLabel: {
    id: `${scope}.upperLabel`,
    defaultMessage: 'Cận trên',
  },

  lowerLabel: {
    id: `${scope}.lowerLabel`,
    defaultMessage: 'Cận dưới',
  },

  valueLabel: {
    id: `${scope}.valueLabel`,
    defaultMessage: 'Giá trị hiện tại',
  },
});
