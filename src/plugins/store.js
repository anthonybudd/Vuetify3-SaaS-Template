import { createStore } from 'vuex';

export default createStore({
    state: {
        user: false,
        group: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            if (user.Groups[0]) {
                state.group = user.Groups[0];
                state.user.isOwner = (state.group.ownerID === state.user.id);
            }
        },
        setGroup(state, group) {
            state.group = group;
            state.user.isOwner = (state.group.ownerID === state.user.id);
        },
    },
    getters: {
        user: (state) => (state.user),
        group: (state) => (state.group),
    },
    actions: {

    },
});