/**
 * Author: Duong Han
 * HUST
 * Asynchronously loads the component for QuestionTab
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
