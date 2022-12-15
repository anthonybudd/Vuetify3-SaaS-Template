<template>
    <v-app>
        <notifications position="top center" />
        <v-main v-if="hasInitialized">
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import { mapMutations } from 'vuex';

import API from '@/services/API';

export default {
    name: 'App',
    data() {
        return {
            hasInitialized: false,
        };
    },
    async mounted() {
        this.initalizeOrRedirectToLogin();
    },
    methods: {
        ...mapMutations(['setUser']),

        /**
         * initalizeOrRedirectToLogin()
         * 
         * This function starts the App. It checks for a locally stored
         * AccessToken, then will try and get a user object.
         */
        async initalizeOrRedirectToLogin() {
            const skipAuthPages = ['/login', '/sign-up', '/logout']; // Auth not needed on these pages
            const skipAuth = new RegExp(skipAuthPages.join('|')).test(window.location.href);

            if (skipAuth) {
                this.hasInitialized = true;
                return;
            }

            const accessToken = localStorage.getItem('AccessToken');
            if (!accessToken) {
                this.hasInitialized = true;
                return this.$router.push('/logout');
            }

            API.setJWT(accessToken);

            try {
                const { data: user } = await API.user.get();
                this.setUser(user);
                this.hasInitialized = true;
            } catch (error) {
                this.hasInitialized = true;
                this.$router.push('/logout');
                this.$root.errorHandler(error);
            }
        }
    },
};
</script>

<style lang="sass">
    @import './style.sass'
</style>
