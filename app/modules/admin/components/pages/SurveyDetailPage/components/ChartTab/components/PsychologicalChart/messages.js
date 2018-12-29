/*
* Author: Duong Han
* HUST
* PsychologicalChart Messages
*
* This contains all the text for the PsychologicalChart component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.PsychologicalChart';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Biểu đồ khảo sát trắc nghiệm tâm lý học sinh trung học',
  },

  download: {
    id: `${scope}.download`,
    defaultMessage: 'Tải xuống',
  },
});
