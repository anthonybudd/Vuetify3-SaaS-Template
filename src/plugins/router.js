
import { createRouter, createWebHistory } from 'vue-router';

const hasAuth = async (from, to, next) => {
  const accessToken = localStorage.getItem('AccessToken');
  if (accessToken) return next();
  return next('/login');
};

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/default/App.vue'),
      children: [
        {
          path: '',
          name: 'index',
          beforeEnter: async (from, to, next) => next('/dashboard'),
        }, {
          path: '/dashboard',
          name: 'Dashboard',
          beforeEnter: hasAuth,
          component: () => import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue'),
        },
        {
          path: '/account',
          name: 'Account',
          beforeEnter: hasAuth,
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
          component: () => import('@/views/Auth/SignUp.vue'),
        },
        {
          path: '/invite/:inviteKey',
          name: 'Invite',
          component: () => import('@/views/Auth/Invite.vue'),
        },
        {
          path: '/forgot',
          name: 'Forgot',
          component: () => import('@/views/Auth/Forgot.vue'),
        },
        {
          path: '/reset/:passwordResetKey',
          name: 'Reset',
          component: () => import('@/views/Auth/Reset.vue'),
        },
      ],
    },
    {
      name: 'logout',
      path: '/logout',
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
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404.vue'),
    },
  ],
});
