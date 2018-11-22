/*
* HUST
* Author: Duong Han
* LocaleToggle Messages
*
* This contains all the text for the LocaleToggle component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LocaleToggle';

export default defineMessages({
  vi: {
    id: `${scope}.optionVI`,
    defaultMessage: 'Tiếng Việt',
  },
  en: {
    id: `${scope}.optionEN`,
    defaultMessage: 'English',
  },
});
