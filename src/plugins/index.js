/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import router from './router';
import store from './store';
import Notifications from '@kyvg/vue3-notification';

import { VDataTable } from 'vuetify/labs/VDataTable';


export function registerPlugins(app) {
  loadFonts();
  app
    .use(vuetify)
    .use(router)
    .use(store)
    .use(Notifications)
    .component('VDataTable', VDataTable);
}
