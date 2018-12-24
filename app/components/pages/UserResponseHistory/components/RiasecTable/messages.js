/*
* Author: Duong Han
* HUST
* RiasecTable Messages
*
* This contains all the text for the RiasecTable component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.pages.UserResponseHistory.RiasecTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Trắc nghiệm dự đoán nghề nghiệp',
  },

  realisticLabel: {
    id: `${scope}.realisticLabel`,
    defaultMessage: 'Hiện thực',
  },

  ruleLabel: {
    id: `${scope}.ruleLabel`,
    defaultMessage: 'Quy tắc',
  },

  discoverLabel: {
    id: `${scope}.discoverLabel`,
    defaultMessage: 'Khám phá',
  },

  artLabel: {
    id: `${scope}.artLabel`,
    defaultMessage: 'Nghệ thuật',
  },

  convinceLabel: {
    id: `${scope}.convinceLabel`,
    defaultMessage: 'Thuyết phục',
  },

  societyLabel: {
    id: `${scope}.societyLabel`,
    defaultMessage: 'Xã hội',
  },
});
