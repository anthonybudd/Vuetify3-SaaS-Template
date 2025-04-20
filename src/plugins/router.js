import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from "vuex";
import { inject } from 'vue';
import onAccessToken from './onAccessToken';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/Default.vue'),
            beforeEnter: async (to, from, next) => await authGuard(to, from, next, true),
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
            component: () => import('@/layouts/Auth.vue'),
            children: [
                {
                    path: '/login',
                    name: 'Login',
                    component: () => import('@/views/Login.vue'),
                },
                {
                    path: '/sign-up',
                    name: 'SignUp',
                    component: () => import('@/views/Login.vue'),
                },
                {
                    path: '/forgot-password',
                    name: 'ForgotPassword',
                    component: () => import('@/views/Login.vue'),
                },
                {
                    path: '/reset-password',
                    name: 'ResetPassword',
                    component: () => import('@/views/Login.vue'),
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

        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/layouts/Default.vue'),
            children: [
                {
                    path: '',
                    component: () => import('@/views/404.vue'),
                },
            ],
        },
    ]
});


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