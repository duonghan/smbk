/*
* HUST
* Author: Duong Han
* HomePageContainer Messages
*
* This contains all the text for the HomePageContainer component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePageContainer';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HomePageContainer container!',
  },
});
