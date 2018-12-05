/*
* Author: Duong Han
* HUST
* GroupTable Messages
*
* This contains all the text for the GroupTable component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.GroupTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Danh sách nhóm câu hỏi',
  },

  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Tên nhóm câu hỏi',
  },

  inputTypeLabel: {
    id: `${scope}.inputTypeLabel`,
    defaultMessage: 'Kiểu',
  },
});
