import { createStore } from "vuex";

export default createStore({
    state: {
        auth: false,
        user: null,
        group: null,
    },
    mutations: {
        setAuth(state, payload) {
            state.auth = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setGroup(state, payload) {
            state.group = payload;
        },
    },
    getters: {
        user: ({ user }) => (user),
        group: ({ group }) => (group),
    }
});