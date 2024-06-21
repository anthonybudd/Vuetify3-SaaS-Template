<template>
    <v-app class="bg-gradient">
        <default-view />
    </v-app>
</template>

<script setup>
import DefaultView from './View.vue';
</script>

<style>
.bg-gradient {
    background: linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%) !important;
}
</style>
