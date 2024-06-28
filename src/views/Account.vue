<template>
    <v-container class="fill-height">
        <h1 class="text-h5 font-weight-bold mb-4">Account</h1>
        <v-sheet
            width="100%"
            rounded
            border
        >
            <v-card-text>
                <v-container class="align-center justify-center">
                    <v-row>
                        <v-col
                            md="3"
                            cols="12"
                            class="text-center"
                        >
                            <v-btn
                                color="primary"
                                variant="tonal"
                                size="x-large"
                                class="initals-btn"
                                readonly
                            >
                                {{ user.firstName.charAt(0).toUpperCase() }}.{{
                                    user.lastName.charAt(0).toUpperCase() }}
                            </v-btn>
                            <p class="text-medium-emphasis">{{ user.id }}</p>
                            <h2 class="ml-4">
                                <span class="font-weight-bold">{{ user.firstName }} {{ user.lastName }}</span>
                            </h2>
                            <h3>
                                <span class="font-weight-emphasis">{{ user.email }}</span>
                            </h3>
                        </v-col>
                        <v-divider :vertical="!sm && !xs"></v-divider>
                        <v-col
                            md="9"
                            cols="12"
                        >
                            <AccountUser />
                            <v-divider></v-divider>
                            <AccountPassword />
                            <v-divider></v-divider>
                            <Groups />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-sheet>
    </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useDisplay } from 'vuetify';
import AccountUser from './../components/AccountUser';
import AccountPassword from './../components/AccountPassword';
import Groups from './../components/Groups';

const { sm, xs } = useDisplay();

const store = useStore();
const user = computed(() => store.state.user);
</script>