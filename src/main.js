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
import NavLayout from './views/components/NavLayout.vue';

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
Vue.component('NavLayout', NavLayout);

export default new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
    methods: {
        errorHandler(err, cb) {
            if (err.isAxiosError) {
                if (!err.response) {
                    console.error(err);
                } else {
                    console.error(err);
                    console.warn(err.request.responseURL);
                    console.warn(err.response.data);
                    console.warn(err.request.status);
                }

                if (typeof cb === 'function') {
                    cb(err.response);
                } else {
                    let text = 'Error';
                    if (err.response && err.response.data && err.response.data.msg) text = err.response.data.msg;
                    this.$notify({
                        type: 'error',
                        text,
                    });
                }
            } else {
                console.error(err);
            }
        },
    }
}).$mount('#app');
