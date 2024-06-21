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
                <v-form
                    ref="form"
                    v-model="isValid"
                    @submit.prevent="submitForm"
                >
                    <div class="d-flex">
                        <v-text-field
                            density="compact"
                            label="Invite user"
                            variant="outlined"
                            class="mb-1"
                            v-model="inviteUser"
                            :error-messages="(errors.inviteUser) ? errors.inviteUser.msg : []"
                            hide-details="auto"
                            :rules="[rules.required, rules.isEmail]"
                            required
                            single-line
                        ></v-text-field>
                        <v-btn
                            color="primary"
                            variant="flat"
                            class="mb-1 ml-4"
                            :disabled="isLoading || !isValid"
                            :loading="isLoading"
                            @click="submitForm"
                        >
                            Invite
                        </v-btn>
                    </div>
                </v-form>
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

                            <span
                                v-if="!item.firstName && !item.lastName"
                                class="text-disabled"
                            >
                                Unkown
                            </span>

                            <v-chip
                                v-if="group.ownerID === item.id"
                                color="info"
                                size="x-small"
                                label
                            >
                                Group Owner
                            </v-chip>
                            <v-chip
                                v-else-if="user.id === item.id"
                                color="info"
                                size="x-small"
                                label
                            >
                                You
                            </v-chip>
                        </template>
                        <template v-slot:item.lastLoginAt="{ item }">
                            <span v-if="item.lastLoginAt">{{ $formatDate(item.lastLoginAt, 'll') }}</span>
                            <span
                                v-else
                                style="text-wrap: nowrap;"
                            >
                                <span
                                    v-if="!item.isLoadingResendInvite"
                                    class="font-weight-emphasis"
                                >
                                    Never<span v-if="!item.reinviteEmailSent">, <a
                                            class="link"
                                            @click="resendInvite(item)"
                                        >resend invite?</a>
                                    </span>
                                </span>
                                <span v-else>
                                    <v-progress-circular
                                        indeterminate
                                        color="blue"
                                        size="20"
                                    ></v-progress-circular>
                                </span>
                            </span>
                        </template>
                        <template v-slot:item.role="{ item }">
                            <v-btn-toggle
                                v-model="item.GroupUser.role"
                                :disabled="group.ownerID === item.id"
                                density="compact"
                            >
                                <v-btn
                                    @click="setRole(item)"
                                    value="User"
                                    size="small"
                                >
                                    User
                                </v-btn>
                                <v-btn
                                    @click="setRole(item)"
                                    value="Admin"
                                    size="small"
                                >
                                    Admin
                                </v-btn>
                            </v-btn-toggle>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <div class="d-flex">
                                <v-dialog max-width="500">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn
                                            v-bind="activatorProps"
                                            variant="tonal"
                                            size="small"
                                            :disabled="group.ownerID === item.id"
                                        >
                                            Remove
                                        </v-btn>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card title="Confirm Remove User?">
                                            <v-card-text>
                                                Are you sure you would like to remove this user from this group?
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    text="Cancel"
                                                    @click="isActive.value = false"
                                                ></v-btn>
                                                <v-btn
                                                    color="red"
                                                    variant="flat"
                                                    :disabled="item.isLoadingRemoveUser"
                                                    :loading="item.isLoadingRemoveUser"
                                                    @click="removeUser(item)"
                                                >Delete</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </template>
                                </v-dialog>
                            </div>
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
import { ref, inject, computed, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

const errorHandler = inject('errorHandler');
const instance = getCurrentInstance();
const { notify } = useNotification();
const rules = inject('rules');
const api = inject('api');
const store = useStore();

const user = computed(() => store.state.user);
const group = computed(() => store.state.group);
const isValid = ref(true);
const isLoading = ref(true);
const inviteUser = ref('');
const errors = ref({});
const items = ref([]);
const headers = [
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Last Login At', key: 'lastLoginAt' },
    { title: 'Role', key: 'role' },
    { title: 'Actions', key: 'actions' }
];

onMounted(async () => {
    getData();
});

const getData = async () => {
    try {
        isLoading.value = true;
        const { data } = await api.group.get(group.value.id);
        items.value = data.Users;
    } catch (error) {
        errorHandler(error);
    } finally {
        isLoading.value = false;
    }
};

const resendInvite = async (item) => {
    try {
        item.isLoadingResendInvite = true;
        await api.group.resendInvitationEmail(group.value.id, item.id);
        await new Promise(r => setTimeout(r, 1000));
        notify(`Invitation email sent to ${item.email}`);
        item.reinviteEmailSent = true;
    } catch (error) {
        errorHandler(error);
    } finally {
        item.isLoadingResendInvite = false;
    }
};

const removeUser = async (item) => {
    try {
        item.isLoadingRemoveUser = true;
        await api.group.remove(group.value.id, item.id);
        notify(`User removed from group`);
        getData();
    } catch (error) {
        errorHandler(error);
    } finally {
        item.isLoadingRemoveUser = false;
    }
};

const setRole = async (item) => {
    try {
        await api.group.setRole(group.value.id, item.id, item.GroupUser.role);
        notify(`User role set to ${item.GroupUser.role}`);
        getData();
    } catch (error) {
        errorHandler(error);
    } finally {
    }
};

const submitForm = async () => {
    try {
        isLoading.value = true;
        await api.group.invite(group.value.id, inviteUser.value);
        notify(`Invitation email sent to ${inviteUser.value}`);
        inviteUser.value = '';
        instance.ctx.$refs.form.resetValidation();
        getData();
    } catch (error) {
        errorHandler(error, (data, code) => {
            if (code === 422) errors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
}; 
</script>
