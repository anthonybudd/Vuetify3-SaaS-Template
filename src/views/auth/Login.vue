<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-card
            class="mx-auto"
            max-width="600"
            min-width="350"
            variant="elevated"
          >
            <login-form @onLogin="onLogin"></login-form>
          </v-card>

          <p class="text-center mt-2">
            <router-link
              to="/forgot"
              class="text-decoration-underline text-white"
            >
              Forgot Password
            </router-link>
          </p>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>


<script>

import LoginForm from './../../components/LoginForm.vue';

export default {
  components: {
    LoginForm
  },

  methods: {
    async onLogin({ accessToken }) {
      try {
        await this.$root.login(accessToken);
        this.$router.push('/dashboard');
      } catch (error) {
        await this.$root.errorHandler(error);
      }
    },
  },
};
</script>
