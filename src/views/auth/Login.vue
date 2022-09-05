<template>
    <v-container fill-height fluid class="p-0">
        <v-row class="fill-height">
            <v-col cols="12" md="7" class="gradient">
                <v-container fill-height fluid class="p-0">
                    <v-row class="fill-height white--text" align="center" justify="center">
                        <v-col cols="12" md="8">
                            <div class="text-h4">Login</div>
                            <div class="text-body-1 mb-4">Don't have an account? Sign Up</div>
                            <v-btn
                                outlined large
                                color="white"
                            >
                                GitHub
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col cols="12" md="5">
                <v-container fill-height fluid class="p-0">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-col cols="12" md="8">
                            <v-form v-model="valid" class="px-4">
                                <div class="text-h6">Login</div>
                                <div class="text-body-1 mb-4">Don't have an account? Sign Up</div>
                                <v-text-field v-model="email" outlined label="email" required></v-text-field>    
                                <v-text-field v-model="password" outlined type="password" label="Password" required></v-text-field>
                                <v-btn @click="onClickLogin" block large color="primary" :disabled="!valid">Login</v-btn>
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
import API from '@/services/API'

export default {
    name: 'Login',
    data() {
        return {
            valid: true,
            email: 'user@example.com',
            password: 'password',
        };
    },
    async mounted() {

    },
    methods: {
        ...mapMutations(['setUser']),
        
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
