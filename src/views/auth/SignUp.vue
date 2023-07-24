<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-card
            class="mx-auto"
            max-width="400"
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
                Sign-Up
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="signUp.firstName"
                      label="First Name"
                      :rules="rules.required"
                      :error-messages="errors?.firstName"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="signUp.lastName"
                      label="Last Name"
                      :rules="rules.required"
                      :error-messages="errors?.lastName"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-text-field
                  v-model="signUp.email"
                  label="Email"
                  :rules="rules.email"
                  :error-messages="errors?.email"
                  variant="outlined"
                  density="compact"
                ></v-text-field>

                <v-text-field
                  v-model="signUp.password"
                  label="Password"
                  :rules="rules.password"
                  :error-messages="errors?.password"
                  variant="outlined"
                  density="compact"
                  type="password"
                  hide-details="auto"
                ></v-text-field>

                <v-row>
                  <v-col class="pb-0">
                    <v-checkbox
                      hide-details="auto"
                      v-model="signUp.tos"
                      value="tos-version-2023-07-13"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                    cols="10"
                    class="pb-0"
                  >
                    <p class="text-subtitle-1 mt-4">
                      I agree to the <a href="#/link-to-your-tos">Terms of Service</a>
                    </p>
                  </v-col>
                  <v-col
                    cols="12"
                    class="py-0"
                    v-if="errors?.tos"
                  >
                    <p>{{ errors.tos }}</p>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  variant="flat"
                  :loading="isLoading"
                  :disabled="!isValid || !signUp.tos"
                  @click="onClickSignUp"
                >
                  Sign-up
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>

          <p class="text-center mt-2">
            <router-link
              to="/login"
              class="text-decoration-underline text-white"
            >
              Already Have An Account? Login
            </router-link>
          </p>
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
    errors: {},

    signUp: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      tos: ''
    },

    rules: {
      required: [
        (v) => !!v || 'This is required',
      ],
      email: [
        (v) => !!v || 'E-mail is required',
        (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Must be a valid E-mail address',
      ],
      password: [
        (v) => !!v || 'Password is required',
        (v) => (v.length > 7) || 'Password must be more than 8 characters',
        (v) => /[a-z]/.test(v) || 'Password must contain at least 1 lowercase letter',
        (v) => /[A-Z]/.test(v) || 'Password must contain at least 1 uppercase letter',
        (v) => /[0-9]/.test(v) || 'Password must contain at least 1 number',
      ],
    }
  }),

  methods: {
    async onClickSignUp() {
      try {
        this.isLoading = false;
        const { data } = await this.$root.API.auth.signUp(this.signUp);
        await this.$root.login(data.accessToken);
        this.$router.push('/dashboard');
      } catch (error) {
        await this.$root.errorHandler(error, (AE) => {
          if (AE.getStatus() === 422) this.errors = AE.getFormErrors();
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
