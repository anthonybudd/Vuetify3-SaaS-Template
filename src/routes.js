export default [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
    },
    {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/Account.vue'),
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import('@/views/auth/SignUp.vue'),
    },
    {
        name: 'logout',
        path: '/logout',
        beforeEnter: async (to, from, next) => {
            console.warn('/logout');
            localStorage.removeItem('AccessToken');
            next('/login');
        },
    },
];
