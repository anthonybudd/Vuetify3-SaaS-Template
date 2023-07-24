<template>
    <v-container class="fill-height">
        <v-responsive class="align-center fill-height">
            <v-row class="d-flex align-center justify-center">
                <v-col cols="auto">
                    <v-card
                        class="mx-auto"
                        max-width="600"
                        min-width="400"
                        min-height="200"
                        variant="elevated"
                    >
                        <v-form
                            v-model="isValid"
                            v-if="view === 'Form'"
                        >
                            <v-img
                                height="75"
                                class="my-4"
                                src="@/assets/logo.svg"
                            />
                            <v-card-title>
                                Forgot Password
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                    v-model="forgot.email"
                                    :error-messages="errors?.email"
                                    @keydown="errors = {}"
                                    label="Email"
                                    :rules="rules.email"
                                    variant="outlined"
                                    density="compact"
                                ></v-text-field>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    variant="flat"
                                    :loading="isLoading"
                                    :disabled="!isValid"
                                    @click="onClickSubmit"
                                >
                                    Submit
                                </v-btn>
                            </v-card-actions>
                        </v-form>

                        <v-container
                            v-if="view === 'Complete'"
                            fill-height
                            fluid
                        >
                            <v-row
                                align="center"
                                justify="center"
                            >
                                <v-col>
                                    <v-card-title class="text-h6 text-md-h5 text-lg-h4">Complete</v-card-title>
                                    <v-card-text>
                                        We have sent you an email with password reset instructions.
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>

                    <p class="text-center mt-2">
                        <router-link
                            to="/login"
                            class="text-decoration-underline text-white"
                        >
                            Login
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
        view: 'Form', // Form, Complete
        isLoading: false,
        isValid: false,

        errors: {},
        forgot: {
            email: '',
        },

        rules: {
            email: [
                (v) => !!v || 'E-mail is required',
                (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Must be a valid E-mail address',
            ],
        }
    }),

    methods: {
        async onClickSubmit() {
            try {
                this.isLoading = false;
                await this.$root.API.auth.forgot(this.forgot);
                this.view = 'Complete';
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
