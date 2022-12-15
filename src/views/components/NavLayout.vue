<template>
    <v-container>
        <v-app-bar
            app
            flat
        >
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-app-bar-nav-icon
                        class="d-flex d-sm-none"
                        v-bind="attrs"
                        v-on="on"
                    ></v-app-bar-nav-icon>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(item, index) in vertnav"
                        :key="index"
                        :to="item.to"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        color="grey darken-1 shrink"
                        size="32"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-account-circle</v-icon></v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(item, index) in vertnav"
                        :key="index"
                        :to="item.to"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer
            app
            class="pt-4"
            color="grey lighten-3"
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        Application
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-item
                    v-for="item in vertnav"
                    :key="item.title"
                    link
                    :to="item.to"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-item
                    link
                    href="https://github.com/anthonybudd/Vuetify-SPA-boilerplate"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-github</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>GitHub <v-icon
                                size="15"
                                class="mx-1"
                            >mdi-open-in-new</v-icon></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-item
                    link
                    to="/logout"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <slot></slot>
    </v-container>
</template>

<script>
export default {
    name: 'Nav',
    data() {
        return {
            vertnav: [
                { title: 'Dashboard', to: '/', icon: 'mdi-view-dashboard' },
                { title: 'Account', to: '/account', icon: 'mdi-account' },
            ],
        };
    },
};
</script>
