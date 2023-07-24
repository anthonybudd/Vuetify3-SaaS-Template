<template>
  <v-app>
    <notifications />
    <v-app-bar
      flat
      color="#0276FD"
    >
      <v-container fluid>
        <v-row>
          <v-col
            cols="4"
            class="text-left"
          >
            <v-img
              width="140"
              class="mt-2"
              src="@/assets/logo-white.svg"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-navigation-drawer
        app
        color="#0276FD"
      >
        {{ windowLocationPathname }}
        <v-list class="py-0">
          <v-list-item
            v-for="item in vertnav"
            :key="item.title"
            link
            :to="item.to"
          >
            <template v-slot:prepend>
              <v-icon
                class="text--white"
                :icon="item.icon"
              ></v-icon>
            </template>
            <v-list-item-title>
              <span class="text--white">{{ item.title }}</span>
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            link
            to="/logout"
          >
            <template v-slot:prepend>
              <v-icon
                class="text--white"
                icon="mdi-logout-variant"
              ></v-icon>
            </template>
            <v-list-item-title>
              <span class="text--white">Logout</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container fluid>
        <v-row class="fill-height">
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      vertnav: [
        { title: 'Dashboard', to: '/dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Account', to: '/account', icon: 'mdi-account' },
      ],
    };
  },
};
</script>
