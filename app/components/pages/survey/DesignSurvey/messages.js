/*
* Author: Duong Han
* HUST
* DesignSurvey Messages
*
* This contains all the text for the DesignSurvey component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.DesignSurvey';

export default defineMessages({
  designTab: {
    id: `${scope}.designTab`,
    defaultMessage: 'Thiết kế',
  },
  editTab: {
    id: `${scope}.editTab`,
    defaultMessage: 'Chỉnh sửa',
  },
  testTab: {
    id: `${scope}.testTab`,
    defaultMessage: 'Xem trước',
  },
});
