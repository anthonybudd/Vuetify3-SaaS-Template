import Notifications from '@kyvg/vue3-notification';
import { loadFonts } from './webfontloader';
import errorHandler from './errorHandler';
import api from './../api/index.js';
import vuetify from './vuetify';
import router from './router';
import moment from 'moment';
import store from './store';


export function registerPlugins(app) {
    loadFonts();
    app
        .use(Notifications)
        .use(store)
        .use(vuetify)
        .use(router)
        .use({
            install: (app) => {
                app.provide('errorHandler', errorHandler);
                app.provide('api', api);

                app.config.globalProperties.$formatDate = (timestamp, format = 'lll') => {
                    if (timestamp === undefined || timestamp === null) return '';
                    return moment(timestamp).format(format);
                };
            },
        });
}
