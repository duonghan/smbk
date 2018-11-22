/*
 * MainApp Messages
 *
 * This contains all the text for the MainApp component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MainApp';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MainApp component !',
  },
});
