/*
* Author: Duong Han
* HUST
* AdminBreadcrum Messages
*
* This contains all the text for the AdminBreadcrum component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AdminBreadcrum';

export default defineMessages({
  // header: {
  //   id: `${scope}.header`,
  //   defaultMessage: 'This is the AdminBreadcrum component!',
  // },

  adminLabel: {
    id: `${scope}.adminLabel`,
    defaultMessage: 'Người quản trị',
  },

  dashboardLabel: {
    id: `${scope}.dashboardLabel`,
    defaultMessage: 'Bảng điều khiển',
  },

  accountLabel: {
    id: `${scope}.accountLabel`,
    defaultMessage: 'Danh sách tài khoản',
  },

  surveyLabel: {
    id: `${scope}.surveyLabel`,
    defaultMessage: 'Khảo sát',
  },

  surveyDetailLabel: {
    id: `${scope}.surveyDetailLabel`,
    defaultMessage: 'Chi tiết',
  },
});
