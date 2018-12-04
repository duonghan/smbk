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
    defaultMessage: 'Không tìm thấy trang',
  },

  msg: {
    id: `${scope}.msg`,
    defaultMessage: 'Không tìm thấy trang',
  },

  description: {
    id: `${scope}.description`,
    defaultMessage:
      'Trang bạn tìm kiếm không tồn tại hoặc đã chuyển sang địa chỉ mới.',
  },
});
