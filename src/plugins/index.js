import Notifications from '@kyvg/vue3-notification';
import { loadFonts } from './webfontloader';
import errorHandler from './errorHandler';
import VueCookies from 'vue-cookies';
import api from './../api/index.js';
import vuetify from './vuetify';
import router from './router';
import store from './store';
import dayjs from 'dayjs';

import './../styles/custom.scss';

import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

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

                app.config.globalProperties.$formatDate = (timestamp, format = 'Do MMM YY H:mm') => {
                    if (timestamp === undefined || timestamp === null) return '';
                    return dayjs(timestamp).format(format);
                };

                app.config.globalProperties.$ago = (timestamp) => {
                    if (timestamp === undefined || timestamp === null) return '';
                    return dayjs().to(dayjs(timestamp));
                };
            },
        });
}
