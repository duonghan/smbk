/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NotFound';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NotFoundPage component !',
  },
  msg: {
    id: `${scope}.msg`,
    defaultMessage: '404 Không tìm thấy trang',
  },
});
