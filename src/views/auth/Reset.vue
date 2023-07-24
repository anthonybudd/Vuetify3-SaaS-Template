<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-card
            class="mx-auto"
            max-width="600"
            min-width="400"
            variant="elevated"
          >
            <v-form v-model="isValid">
              <v-img
                height="75"
                class="my-4"
                src="@/assets/logo.svg"
              />
              <v-card-title>
                Reset Password
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="reset.email"
                  label="Email"
                  variant="outlined"
                  density="compact"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="reset.password"
                  @keydown.enter.prevent="onClickSubmit"
                  :rules="rules.password"
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
                  color="primary"
                  variant="flat"
                  min-width="140"
                  :loading="isLoading"
                  :disabled="!isValid"
                  @click="onClickSubmit"
                >
                  Reset Password
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>


<script>

export default {
  data: () => ({
    isLoading: false,
    isValid: false,

    reset: {
      email: '',
      password: '',
      passwordResetKey: '',
    },

    rules: {
      password: [
        (v) => !!v || 'Password is required',
        (v) => (v.length > 7) || 'Password must be more than 8 characters',
        (v) => /[a-z]/.test(v) || 'Password must contain at least 1 lowercase letter',
        (v) => /[A-Z]/.test(v) || 'Password must contain at least 1 uppercase letter',
        (v) => /[0-9]/.test(v) || 'Password must contain at least 1 number',
      ],
    }
  }),

  computed: {
    passwordResetKey() {
      return this.$route.params.passwordResetKey;
    }
  },

  async mounted() {
    try {
      const { data: user } = await this.$root.API.auth.getUserByResetKey(this.passwordResetKey);
      this.reset.email = user.email;
    } catch (error) {
      this.$notify({
        text: 'Invalid Link',
        type: 'error'
      });
    }
  },

  methods: {
    async onClickSubmit() {
      try {
        this.isLoading = false;
        this.reset.passwordResetKey = this.passwordResetKey;
        const { data } = await this.$root.API.auth.reset(this.reset);
        await this.$root.login(data.accessToken);
        this.$router.push('/dashboard');
      } catch (error) {
        await this.$root.errorHandler(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
