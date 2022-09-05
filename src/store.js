import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    getters: {
        user: (state) => (state.user),
    },
    actions: {

    },
});
