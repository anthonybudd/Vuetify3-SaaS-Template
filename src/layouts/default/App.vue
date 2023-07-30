<template>
  <v-app>
    <notifications />

    <v-main v-if="isSwitchingGroup">
      <v-container class="fill-height">
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            class="text-center"
          >
            <v-progress-circular
              :size="70"
              :width="7"
              color="#0276FD"
              indeterminate
            ></v-progress-circular>
            <p class="text-medium-emphasis mt-3">Switching Group</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-app-bar
      v-if="!isSwitchingGroup"
      flat
      color="#0276FD"
    >
      <v-img
        width="140"
        max-width="140"
        class="ml-2 mt-2"
        src="@/assets/logo-white.svg"
      />
      <v-spacer></v-spacer>
      <v-menu v-if="Array.isArray(user.Groups) && user.Groups.length > 1">
        <template v-slot:activator="{ props }">
          <v-btn
            color="white"
            v-bind="props"
          >
            Switch Group <v-icon size="small">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item
            v-for="(g, i) in user.Groups"
            :key="i"
            :value="i"
            @click="onClickChangeGroup(g.id)"
          >
            <v-list-item-title>{{ g.name }}</v-list-item-title>
            <template v-slot:append>
              <v-btn
                v-if="group.id === g.id"
                color="#0276FD"
                icon="mdi-check"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="white"
            v-bind="props"
            size="50"
          >
            <v-icon size="x-large">mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item
            v-for="(item, index) in vertnav"
            :key="index"
            :value="index"
          >
            <v-list-item-title @click="$router.push(item.to)">{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title @click="$router.push('/logout')">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main v-if="!isSwitchingGroup">
      <v-navigation-drawer
        app
        color="#0276FD"
      >
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
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      isSwitchingGroup: false,
      vertnav: [
        { title: 'Dashboard', to: '/dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Account', to: '/account', icon: 'mdi-account' },
      ],
    };
  },
  computed: {
    ...mapGetters(['user', 'group'])
  },
  methods: {
    ...mapMutations(['setGroup']),

    async onClickChangeGroup(groupID) {
      try {
        this.isSwitchingGroup = true;
        const { data: user } = await this.$root.API.user.get();
        for (const group of user.Groups) {
          if (group.id === groupID) {
            this.setGroup(group);
          }
        }

        // AB: You may want to remove this.
        // I added this because isSwitchingGroup will change
        // from true to false too quickly and the GroupSwitching
        // spinner does not display long enough and it looks like a bug
        await new Promise(r => setTimeout(r, 2000));
      } catch (error) {
        this.$root.errorHandler(error);
      } finally {
        this.isSwitchingGroup = false;
      }
    }
  }
};
</script>
