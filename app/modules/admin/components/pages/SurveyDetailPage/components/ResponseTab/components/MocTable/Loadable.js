/**
 * Author: Duong Han
 * HUST
 * Asynchronously loads the component for MocTable
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
