import { createStore } from 'vuex';

export default createStore({
    state: {
        user: false,
        group: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setGroup(state, group) {
            state.group = group;
            state.user.isOwner = (state.group.ownerID === state.user.id);
            localStorage.setItem('lastGroupID', group.id);
        },
    },
    getters: {
        user: (state) => (state.user),
        group: (state) => (state.group),
    },
    actions: {

    },
});