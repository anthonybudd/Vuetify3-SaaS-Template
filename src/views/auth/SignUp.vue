<template>
    <v-container
        fill-height
        fluid
        class="p-0"
    >
        <v-row class="fill-height">
            <v-col
                cols="12"
                md="7"
                class="gradient d-none d-md-flex"
            >
                <v-container
                    fill-height
                    fluid
                    class="p-0"
                >
                    <v-row
                        class="fill-height white--text"
                        align="center"
                        justify="center"
                    >
                        <v-col
                            cols="12"
                            md="8"
                        >
                            <div class="text-h4">Welcome</div>
                            <div class="text-body-1 mb-4">This is a simple Vuetify project by Anthony Budd</div>
                            <v-btn
                                outlined
                                large
                                color="white"
                                @click="openGitHub"
                            >
                                GitHub
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col
                cols="12"
                md="5"
            >
                <v-container
                    fill-height
                    fluid
                    class="p-0"
                >
                    <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                    >
                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-form
                                v-model="valid"
                                class="px-4"
                            >
                                <div class="text-h6">Sign-up</div>
                                <div class="text-body-1 mb-4">Already have an account?
                                    <router-link to="/login">Login</router-link>
                                </div>
                                <v-text-field
                                    v-model="signUp.firstName"
                                    outlined
                                    label="First Name"
                                    :rules="rules.firstName"
                                    :error-messages="errors.firstName?.msg"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="signUp.lastName"
                                    outlined
                                    label="Last Name"
                                    :rules="rules.lastName"
                                    :error-messages="errors.lastName?.msg"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="signUp.email"
                                    outlined
                                    label="Email"
                                    :rules="rules.email"
                                    @keyup="() => (errors.email = null)"
                                    :error-messages="errors.email?.msg"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="signUp.password"
                                    outlined
                                    type="password"
                                    label="Password"
                                    :rules="rules.password"
                                    :error-messages="errors.password?.msg"
                                    required
                                ></v-text-field>
                                <v-checkbox
                                    required
                                    v-model="signUp.tos"
                                    :rules="rules.tos"
                                    value="2022-12-13"
                                    validate-on-blur
                                >
                                    <template v-slot:label>
                                        <div>
                                            I have read and agreed to the
                                            <a
                                                target="_blank"
                                                href="/terms-of-service"
                                            >
                                                Terms of Service
                                            </a>
                                        </div>
                                    </template>
                                </v-checkbox>
                                <v-btn
                                    @click="onClickSignUp"
                                    block
                                    large
                                    color="primary"
                                    :disabled="!valid"
                                >Sign-Up</v-btn>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import API from '@/services/API';

export default {
    name: 'Sign-up',
    data() {
        return {
            valid: true,
            errors: {},
            signUp: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                tos: false,
            },
            rules: {
                firstName: [
                    (v) => !!v || 'First name is required',
                ],
                lastName: [
                    (v) => !!v || 'Last name is required',
                ],
                email: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail must be valid',
                ],
                password: [
                    (v) => !!v || 'Password is required',
                    (v) => (v.length > 7) || 'Password must be more than 8 characters',
                    (v) => /[a-z]/.test(v) || 'Password must contain at least 1 lowercase letter',
                    (v) => /[A-Z]/.test(v) || 'Password must contain at least 1 uppercase letter',
                    (v) => /[0-9]/.test(v) || 'Password must contain at least 1 number',
                ],
                tos: [
                    (v) => !!v || 'Required',
                ],
            }
        };
    },
    async mounted() {

    },
    methods: {
        ...mapMutations(['setUser']),

        openGitHub() {
            window.location.href = 'https://github.com/anthonybudd/Vuetify-SPA-boilerplate';
        },

        async onClickSignUp() {
            try {
                const { data: auth } = await API.auth.signUp(this.signUp);
                localStorage.setItem('AccessToken', auth.accessToken);
                API.setJWT(auth.accessToken);
                const { data: user } = await API.user.get();
                this.setUser(user);
                this.$router.push('/');
            } catch (error) {
                this.$root.errorHandler(error, (response) => {
                    if (response) {
                        const { status, data } = response;
                        if (status === 422) {
                            this.errors = data.errors;
                        }
                    }
                });
            }
        },
    },
};
</script>

<style lang="sass">
    .gradient
        background: #1FA2FF
        background: -webkit-linear-gradient(to right, #1FA2FF, #12D8FA, #A6FFCB)
        background: linear-gradient(to right, #1FA2FF, #12D8FA, #A6FFCB)
</style>
