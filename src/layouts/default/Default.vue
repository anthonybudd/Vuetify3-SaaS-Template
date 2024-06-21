<template>
  <v-app class="bg-grey-lighten-4">
    <notifications />
    <AppBar :disabled="isChangingGroup" />
    <DefaultView v-if="!isChangingGroup" />

    <v-container
      v-if="isChangingGroup"
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="2"
          class="text-center"
        >
          <v-progress-circular
            indeterminate
            size="70"
            :width="7"
            class="mb-4"
          >
          </v-progress-circular>
          <p>Changing Groups</p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import AppBar from './AppBar.vue';
import DefaultView from './View.vue';
import emitter from 'tiny-emitter/instance';

const isChangingGroup = ref(false);

emitter.on('onChangeGroup', async () => {
  isChangingGroup.value = true;
  await new Promise(r => setTimeout(r, 1000)); // AB: This for UX
  isChangingGroup.value = false;
});
</script>
