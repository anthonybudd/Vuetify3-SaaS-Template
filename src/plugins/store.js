import { createStore } from "vuex";

export default createStore({
    state: {
        user: null,
        group: null,
    },
    mutations: {
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