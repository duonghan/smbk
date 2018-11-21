/*
* Author: Duong Han
* HUST
* Setting Messages
*
* This contains all the text for the Setting component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Setting';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Setting component!',
  },
});
