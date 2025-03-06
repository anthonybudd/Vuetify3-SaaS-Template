<template>
    <v-container
        class="fill-height"
        fluid
    >
        <v-row
            align="center"
            justify="center"
        >
            <v-col
                md="3"
                sm="6"
                xs="12"
                class="text-center"
            >
                <v-sheet
                    rounded
                    border
                >
                    <v-container class="px-4 py-4">
                        <v-img
                            class="mb-4 d-block m-auto"
                            width="60"
                            min-width="60"
                            src="./../../assets/logo.png"
                        ></v-img>
                        <v-row>
                            <v-col class="px-8">
                                <h2 class="text-center mb-4">Login</h2>
                                <v-text-field
                                    v-model="email"
                                    :disabled="isLoading"
                                    variant="outlined"
                                    label="Email"
                                    required
                                    density="compact"
                                    @keydown.enter.prevent="onClickLogin"
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    :disabled="isLoading"
                                    variant="outlined"
                                    type="password"
                                    label="Password"
                                    required
                                    density="compact"
                                    @keydown.enter.prevent="onClickLogin"
                                    :error-messages="isError
                                        ? ['Incorrect email or password']
                                        : []
                                        "
                                ></v-text-field>
                                <v-btn
                                    block
                                    :disabled="isLoading"
                                    :loading="isLoading"
                                    color="primary"
                                    @click="onClickLogin"
                                >Login</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import api from "./../../api";
import router from "@/plugins/router";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onAccessToken } from "@/plugins/router";

const store = useStore();
const route = useRoute();
const $cookies = inject('$cookies');

const isLoading = ref(false);
const isError = ref(false);
const email = ref("");
const password = ref("");

onMounted(() => {
    if (window.location.href.includes('localhost')) {
        email.value = 'user@example.com';
        password.value = 'Password@1234';
    }
});

const onClickLogin = async () => {
    try {
        isLoading.value = true;
        const { data } = await api.auth.login({
            email: email.value,
            password: password.value,
        });

        await onAccessToken(data.accessToken, $cookies, store);

        if (route.query.redirect) {
            router.push(atob(route.query.redirect));
        } else {
            router.push('/');
        }
    } catch (error) {
        isLoading.value = false;
        isError.value = true;
        console.error(error);
    }
};
</script>
