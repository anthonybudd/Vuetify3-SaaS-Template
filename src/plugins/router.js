import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from "vuex";
import { inject } from 'vue';

import api from './../api';

export const onAccessToken = async (accessToken, $cookies, store) => {
    $cookies.set('AccessToken', accessToken);
    api.setJWT(accessToken);
    const { data: user } = await api.user.get();
    store.commit('setUser', user);
    store.commit('setAuth', true);

    let lastGroupID = localStorage.getItem('lastGroupID');
    if (lastGroupID) {
        for (const { id } of user.groups) {
            if (id === lastGroupID) lastGroupID = id;
        }
    }
    const useZerothGroup = async () => {
        if (user.groups && user.groups[0]) {
            const { data: group } = await api.group.get(user.groups[0].id);
            store.commit('setGroup', group);
        }
    };
    if (lastGroupID) {
        try {
            const { data: group } = await api.group.get(lastGroup.id);
            store.commit('setGroup', group);
        } catch (e) {
            useZerothGroup();
        }
    } else {
        useZerothGroup();
    }
};

const authGuard = async (to, from, next, redirect = true) => {
    const store = useStore();
    const $cookies = inject('$cookies');
    let accessToken = $cookies.get('AccessToken');

    if (!accessToken) {
        if (redirect) {
            next('/login');
        } else {
            return next();
        }
    } else {
        if (store.state.auth) {
            return next();
        } else {
            try {
                await onAccessToken(accessToken, $cookies, store);
                return next();
            } catch (error) {
                console.error(error);
                if (redirect) {
                    next('/login');
                } else {
                    return next();
                }
            }
        }
    }
};

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/default/Default.vue'),
            beforeEnter: async (to, from, next) =>
                await authGuard(to, from, next, true),
            children: [
                {
                    path: '',
                    name: 'Dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                },
                {
                    path: '/books',
                    name: 'Books',
                    component: () => import('@/views/BooksIndex.vue'),
                },
                {
                    path: '/books/:bookID',
                    name: 'BookSingle',
                    component: () => import('@/views/BookSingle.vue'),
                },
                {
                    path: '/account',
                    name: 'Account',
                    component: () => import('@/views/Account.vue'),
                },
            ],
        },

        {
            path: '/',
            component: () => import('@/layouts/default/Auth.vue'),
            children: [
                {
                    path: '/login',
                    name: 'Login',
                    component: () => import('@/views/Auth/Login.vue'),
                },
                {
                    path: '/sign-up',
                    name: 'SignUp',
                    component: () => import('@/views/Auth/Login.vue'),
                },
                {
                    path: '/forgot-password',
                    name: 'ForgotPassword',
                    component: () => import('@/views/Auth/Login.vue'),
                },
                {
                    path: '/reset-password',
                    name: 'ResetPassword',
                    component: () => import('@/views/Auth/Login.vue'),
                },
                {
                    path: '/logout',
                    name: 'Logout',
                    beforeEnter: async (to, from, next) => {
                        console.warn('/logout');
                        localStorage.removeItem('AccessToken');
                        if (to.query.redirect) {
                            next(`/login?redirect=${to.query.redirect}`);
                        } else {
                            next('/login');
                        }
                    },
                },
            ],
        },
    ]
});
