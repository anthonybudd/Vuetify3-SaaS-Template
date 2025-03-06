import Notifications from '@kyvg/vue3-notification';
import { loadFonts } from './webfontloader';
import errorHandler from './errorHandler';
import VueCookies from 'vue-cookies';
import api from './../api/index.js';
import vuetify from './vuetify';
import router from './router';
import moment from 'moment';
import store from './store';

import './../styles/custom.scss';

export function registerPlugins(app) {
    loadFonts();
    app
        .use(Notifications)
        .use(store)
        .use(vuetify)
        .use(router)
        .use(VueCookies, { expires: '7d' })
        .use({
            install: (app) => {
                app.provide('errorHandler', errorHandler);
                app.provide('api', api);
                app.provide('rules', {
                    required: (value) => !!value || 'This field is required.',
                    isEmail: (value) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Must be valid email'
                });

                app.config.globalProperties.$formatDate = (timestamp, format = 'lll') => {
                    if (timestamp === undefined || timestamp === null) return '';
                    return moment(timestamp).format(format);
                };
            },
        });
}
