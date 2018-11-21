/*
 * Admin Messages
 *
 * This contains all the text for the Admin component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.modules.admin.components.DashBoard';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Admin component !',
  },
  tableTitle: {
    id: `${scope}.tableTitle`,
    defaultMessage: 'DANH SÁCH TÀI KHOẢN',
  },
});
