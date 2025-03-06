<template>
    <router-view />
    <notifications />
</template>

<script setup>
import { useNotification } from '@kyvg/vue3-notification';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const { notify } = useNotification();

onMounted(async () => {
    await router.isReady();
    if (route.query.email_verified) notify('Email verified successfully');
});
</script>
