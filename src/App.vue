<template>
    <router-view v-if="appLoaded" />
    <notifications />
</template>

<script setup>
import { useNotification } from '@kyvg/vue3-notification';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, inject } from 'vue';
import { useStore } from 'vuex';

const api = inject('api');
const route = useRoute();
const router = useRouter();
const store = useStore();
const { notify } = useNotification();
const errorHandler = inject('errorHandler');

const appLoaded = ref(false);

const skipAuthOnTheseUrls = ['/login', '/sign-up'];


onMounted(async () => {
    // Auth init 
    const skipAuth = new RegExp(skipAuthOnTheseUrls.join('|')).test(window.location.href);
    if (skipAuth) return appLoaded.value = true;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access_token')) localStorage.setItem('AccessToken', urlParams.get('access_token'));
    const accessToken = localStorage.getItem('AccessToken');
    if (!accessToken) {
        appLoaded.value = true;
        router.push('/logout');
    } else {
        try {
            api.setJWT(accessToken);
            const { data: user } = await api.user.get();
            store.commit('setUser', user);

            let lastGroupID = localStorage.getItem('lastGroupID');
            let lastGroup;
            for (const g of user.Groups) {
                if (g.id === lastGroupID) lastGroup = g;
            }

            const useZerothGroup = async () => {
                const { data: group } = await api.group.get(user.Groups[0].id);
                store.commit('setGroup', group);
            };

            if (lastGroup) {
                try {
                    const { data: group } = await api.group.get(lastGroup.id);
                    store.commit('setGroup', group);
                } catch (e) {
                    useZerothGroup();
                }
            } else if (user.Groups[0]) {
                useZerothGroup();
            }
        } catch (error) {
            console.error(error);
            errorHandler(error, (data, code, error) => {
                router.push('/logout');
            });
        } finally {
            appLoaded.value = true;
        }
    }


    await router.isReady();
    if (route.query.email_verified) notify('Email verified successfully');

});
</script>
