<template>
  <v-form>
    <v-img
      height="75"
      class="my-4"
      src="@/assets/logo.svg"
    />
    <v-card-title>
      Log in
    </v-card-title>
    <v-card-subtitle>
      user@example.com / Password@1234
    </v-card-subtitle>
    <v-card-text>
      <v-text-field
        v-model="login.email"
        @keydown.enter.prevent="onClickLogin"
        label="Email"
        variant="outlined"
        density="compact"
      ></v-text-field>
      <v-text-field
        v-model="login.password"
        @keydown.enter.prevent="onClickLogin"
        label="Password"
        variant="outlined"
        density="compact"
        type="password"
        required
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        variant="text"
        @click="$router.push('/sign-up')"
      >
        Sign-up
      </v-btn>
      <v-btn
        color="primary"
        variant="flat"
        min-width="140"
        :loading="isLoading"
        @click="onClickLogin"
      >
        Log in
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,

    login: {
      email: 'user@example.com',
      password: 'Password@1234',
      // email: '',
      // password: '',
    },
  }),

  methods: {
    async onClickLogin() {
      try {
        this.isLoading = true;
        const { data } = await this.$root.API.auth.login(this.login);
        this.$emit('onLogin', { accessToken: data.accessToken });
      } catch (error) {
        await this.$root.errorHandler(error, (AE) => {
          if (AE.getStatus() === 401) return this.$notify({
            text: 'Incorrect email or password',
            type: 'error'
          });
          this.$notify({
            text: 'Error',
            type: 'error'
          });
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
