/**
 * Author: Duong Han
 * HUST
 * Asynchronously loads the component for Landing
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
