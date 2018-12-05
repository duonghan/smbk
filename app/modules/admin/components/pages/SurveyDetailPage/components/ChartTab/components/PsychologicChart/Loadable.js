/**
 * Author: Duong Han
 * HUST
 * Asynchronously loads the component for PsychologicChart
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
