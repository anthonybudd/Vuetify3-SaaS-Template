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
                                <div class="text-h6">Login</div>
                                <div class="text-body-1 mb-4">Don't have an account?
                                    <router-link to="/sign-up">Sign Up</router-link>
                                </div>
                                <v-text-field
                                    v-model="email"
                                    outlined
                                    label="Email"
                                    :rules="rules.email"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    outlined
                                    type="password"
                                    label="Password"
                                    :rules="rules.password"
                                    required
                                ></v-text-field>
                                <v-btn
                                    @click="onClickLogin"
                                    block
                                    large
                                    color="primary"
                                    :disabled="!valid"
                                >Login</v-btn>
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
    name: 'Login',
    data() {
        return {
            valid: true,
            email: 'user@example.com',
            password: 'password',

            rules: {
                email: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail must be valid',
                ],
                password: [
                    (v) => !!v || 'Password is required',
                    (v) => (v.length > 7) || 'Password must be more than 8 characters',
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

        async onClickLogin() {
            try {
                const { data: auth } = await API.auth.login({
                    email: this.email,
                    password: this.password
                });

                localStorage.setItem('AccessToken', auth.accessToken);
                API.setJWT(auth.accessToken);
                const { data: user } = await API.user.get();
                this.setUser(user);
                this.$router.push('/');
            } catch (error) {
                if (error.isAxiosError && error.request && error.request.status) {
                    if (error.request.status === 401) {
                        this.$notify({
                            type: 'error',
                            text: 'Incorrect email or password',
                        });
                    }
                } else {
                    this.$root.errorHandler(error);
                }
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
