import VueCurrencyFilter from 'vue-currency-filter';
import Notifications from 'vue-notification';
import VueMoment from 'vue-moment';
import VueRouter from 'vue-router';
import VModal from 'vue-js-modal';
import VueMask from 'v-mask';
import Vue from 'vue';

import App from './App.vue';
import routes from './routes';
import store from './store.js';
import vuetify from './vuetify.js';

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

Vue.config.productionTip = false;
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(VueMoment);
Vue.use(VueMask);
Vue.use(VueCurrencyFilter, {
    symbol: '$',
    thousandsSeparator: ',',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: false,
    avoidEmptyDecimals: undefined
});

export default new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
    methods: {
        errorHandler(err, cb) {
            if (err.isAxiosError && err.request && err.response && err.response.config) {
                console.warn(`AXIOS ERROR: ${err.request.status} ${err.response.config.method.toUpperCase()} - ${err.request.responseURL}`);
                console.warn(err.response.data);

                if (err.request.status !== 422) {
                    if (err.response.data && err.response.data.code) {
                        this.$notify({
                            type: 'error',
                            text: err.response.data.msg,
                        });
                    }
                }
            } else {
                console.error(err);
            }
        },
    }
}).$mount('#app');
