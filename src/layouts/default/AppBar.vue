<template>
    <div>
        <v-app-bar
            flat
            :height="(xs) ? 80 : 162"
        >
            <v-container
                fluid
                class="px-0 py-0"
            >
                <v-container class="d-flex align-center justify-center">
                    <v-app-bar-nav-icon
                        v-if="xs"
                        @click="drawer = !drawer"
                    ></v-app-bar-nav-icon>
                    <v-spacer v-if="xs"></v-spacer>

                    <div class="d-flex align-center justify-center">
                        <v-img
                            :width="(xs) ? 40 : 60"
                            src="./../../assets/logo.png"
                        ></v-img>
                        <h1
                            v-if="!xs"
                            class="ml-4"
                        >Vuetify</h1>
                    </div>

                    <v-spacer></v-spacer>

                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        location="end"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                color="primary"
                                variant="outlined"
                                v-bind="props"
                                class="px-1"
                                :disabled="disabled"
                            >
                                <v-icon
                                    icon="mdi-account"
                                    size="large"
                                ></v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-text class="d-flex align-center justify-center">
                                <v-btn
                                    color="primary"
                                    variant="tonal"
                                    class="px-1"
                                >
                                    {{ user.firstName.charAt(0).toUpperCase() }}.{{
                                        user.lastName.charAt(0).toUpperCase() }}
                                </v-btn>
                                <p class="ml-4">
                                    <span class="font-weight-bold">{{ user.firstName }} {{ user.lastName }}</span><br>
                                    <span class="text-medium-emphasis">{{ user.email }}</span>
                                </p>
                            </v-card-text>
                            <v-divider v-if="groups.length > 1"></v-divider>
                            <v-list
                                class="pb-0 pt-0"
                                v-if="groups.length > 1"
                            >
                                <v-list-group value="Groups">
                                    <template v-slot:activator="{ props }">
                                        <v-list-item
                                            v-bind="props"
                                            :title="`Group: ${group.name}`"
                                        ></v-list-item>
                                    </template>

                                    <v-list-item
                                        v-for="(g, i) in groups"
                                        :key="i"
                                        :title="g.name"
                                        :value="g.id"
                                        :disabled="drawer.id === group.id"
                                        @click="changeGroup(g.id)"
                                    ></v-list-item>
                                </v-list-group>
                                <v-list-item :to="'/account'">
                                    <v-list-item-title>Account</v-list-item-title>
                                </v-list-item>
                                <v-list-item :to="'/logout'">
                                    <v-list-item-title>Logout</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                </v-container>
                <v-divider class="d-none d-sm-block"></v-divider>
                <v-container class="d-none d-sm-block">
                    <v-btn
                        v-for="menuItem in menuItems"
                        :to="menuItem.href"
                        :key="menuItem.text"
                        :text="menuItem.text"
                        :disabled="disabled"
                        :active="((menuItem.text == 'Dashboard' && $route.path === '/') || (menuItem.text != 'Dashboard' && $route.path.includes(menuItem.href)))"
                        variant="text"
                    ></v-btn>
                </v-container>
                <v-divider></v-divider>
            </v-container>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            temporary
        >
            <v-list-item
                v-for="menuItem in menuItems"
                :to="menuItem.href"
                :key="menuItem.text"
                :title="menuItem.text"
                :disabled="disabled"
                link
            ></v-list-item>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { ref, toRefs, computed, inject } from 'vue';
import { useStore } from 'vuex';
import emitter from 'tiny-emitter/instance';

const api = inject('api');
const errorHandler = inject('errorHandler');
const store = useStore();
const router = useRouter();
const { xs } = useDisplay();
const props = defineProps({
    disabled: Boolean,
});



const { disabled } = toRefs(props);
const group = computed(() => store.state.group);
const user = computed(() => store.state.user);
const groups = ref(user.value.Groups);
const drawer = ref(false);
const menu = ref(false);

const menuItems = [
    { href: '/', text: 'Dashboard' },
    { href: '/books', text: 'Books' },
    { href: '/account', text: 'Account' },
];

router.beforeEach((to, from, next) => {
    menu.value = false;
    next();
});

const changeGroup = async (groupID) => {
    try {
        const { data: group } = await api.group.get(groupID);
        emitter.emit('onChangeGroup');
        store.commit('setGroup', group);
        menu.value = false;
        localStorage.setItem('lastGroupID', group.id);
    } catch (error) {
        errorHandler(error);
    }
};
</script>
