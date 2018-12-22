/**
 * Author: Duong Han
 * HUST
 * Asynchronously loads the component for RiasecTable
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
