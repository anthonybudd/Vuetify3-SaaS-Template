<template>
  <router-view />
</template>

<script>
import API from '@/api/API';

import { mapMutations } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      API
    };
  },
  async beforeMount() {
    const skipAuthPages = ['/login', '/sign-up', '/forgot', '/reset/', '/logout', '/invite/']; // Auth not needed on these pages
    const skipAuth = new RegExp(skipAuthPages.join('|')).test(window.location.href);

    if (skipAuth) return;

    const redirectToLogin = () => this.$router.push({
      path: '/logout',
      query: {
        redirect: btoa(window.location.pathname),
      }
    });

    const accessToken = localStorage.getItem('AccessToken');
    if (!accessToken) return redirectToLogin();

    this.API.setJWT(accessToken);

    try {
      const { data: user } = await this.API.user.get();
      this.setUser(user);

      const lastGroupID = localStorage.getItem('lastGroupID');
      const lastGroup = user.Groups.filter(({ id }) => (id === lastGroupID)).pop();
      if (lastGroup) {
        this.setGroup(lastGroup);
      } else if (user.Groups[0]) {
        this.setGroup(user.Groups[0]);
      }
    } catch (error) {
      redirectToLogin();
      this.$root.errorHandler(error);
    }
  },
  methods: {
    ...mapMutations(['setUser', 'setGroup']),

    async login(accessToken) {
      localStorage.setItem('AccessToken', accessToken);
      this.API.setJWT(accessToken);
      const { data: user } = await this.API.user.get();
      this.setUser(user);

      const lastGroupID = localStorage.getItem('lastGroupID');
      const lastGroup = user.Groups.filter(({ id }) => (id === lastGroupID)).pop();
      if (lastGroup) {
        this.setGroup(lastGroup);
      } else if (user.Groups[0]) {
        this.setGroup(user.Groups[0]);
      }

      if (this.$route.query.redirect) {
        this.$router.push(atob(this.$route.query.redirect));
      } else {
        this.$router.push('/');
      }
    },

    errorHandler(error, cb) {
      console.error(error);
      if (typeof cb === 'function') {

        class AxiosError {
          constructor(error) {
            this.error = error;
          }

          getStatus() {
            try {
              return this.error.request.status;
            } catch (error) {
              return null;
            }
          }

          getData() {
            try {
              return this.error.response.data;
            } catch (error) {
              return null;
            }
          }

          getFormErrors() {
            try {
              const errorBag = {};
              Object.entries(this.error.response.data.errors).map(
                ([key, { msg }]) => (errorBag[key] = msg)
              );
              return errorBag;
            } catch (error) {
              return {};
            }
          }

          getErrorCode() {
            try {
              return this.error.response.data.code;
            } catch (error) {
              return '';
            }
          }

          getErrorMsg() {
            try {
              return this.error.response.data.msg;
            } catch (error) {
              return '';
            }
          }
        }

        cb(new AxiosError(error));
      }
    }
  }
};
</script>
