<template>
    <v-container>
        <v-row>
            <v-col
                md="12"
                cols="12"
            >
                <h3>Group: {{ group.name }}</h3>
            </v-col>
            <v-col cols="12">
                <v-sheet
                    width="100%"
                    rounded
                    border
                >
                    <v-data-table
                        :headers="headers"
                        :items="items"
                        :loading="isLoading"
                    >
                        <template v-slot:item.name="{ item }">
                            {{ item.firstName }} {{ item.lastName }}
                        </template>
                        <template v-slot:item.role="{ item }">

                            <v-chip
                                v-if="group.ownerID === item.id"
                                color="red"
                                size="small"
                                label
                            >
                                Group Owner
                            </v-chip>
                            <v-chip
                                v-else
                                :color="item.GroupUser.role === 'Admin' ? 'blue' : 'green'"
                                size="small"
                                label
                            >
                                {{ item.GroupUser.role }}
                            </v-chip>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-btn
                                variant="tonal"
                                size="small"
                            >
                                Remove
                            </v-btn>
                        </template>
                        <template #bottom></template>
                    </v-data-table>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useNotification } from '@kyvg/vue3-notification';
import { ref, inject, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const errorHandler = inject('errorHandler');
const { notify } = useNotification();
const api = inject('api');
const store = useStore();

const rules = {
    required: (value) => !!value || 'Required.',
};

const group = computed(() => store.state.group);
const isLoading = ref(true);
const items = ref([]);
const headers = [
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Role', key: 'role' },
    { title: 'Actions', key: 'actions' }
];

onMounted(async () => {
    try {
        isLoading.value = true;
        const { data } = await api.group.get(group.value.id);
        items.value = data.Users;
    } catch (error) {
        errorHandler(error);
    } finally {
        isLoading.value = false;
    }
});


const submitForm = async () => {
    try {
        isLoading.value = true;
        await api.user.updatePassword({
            password: password.value,
            newPassword: newPassword.value,
        });
        notify('Password updated.');
        password.value = '';
        newPassword.value = '';
    } catch (error) {
        errorHandler(error, (data, code) => {
            if (code === 422) errors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
}; 
</script>
