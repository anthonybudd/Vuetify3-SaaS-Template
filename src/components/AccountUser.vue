<template>
    <v-container>
        <v-form
            v-model="isValid"
            @submit.prevent="submitForm"
        >
            <v-row>
                <v-col
                    md="12"
                    cols="12"
                >
                    <h3>User Details</h3>
                </v-col>
                <v-col
                    md="6"
                    cols="12"
                >
                    <v-text-field
                        v-model="user.firstName"
                        :error-messages="(errors.firstName) ? errors.firstName.msg : []"
                        hide-details="auto"
                        label="First Name"
                        variant="outlined"
                        density="compact"
                        class="mb-4"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="user.lastName"
                        :error-messages="(errors.lastName) ? errors.lastName.msg : []"
                        hide-details="auto"
                        label="Last Name"
                        variant="outlined"
                        density="compact"
                        class="mb-4"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                </v-col>
                <v-col
                    md="6"
                    cols="12"
                >
                    <v-text-field
                        v-model="user.id"
                        hide-details="auto"
                        label="ID"
                        variant="outlined"
                        density="compact"
                        class="mb-4"
                        disabled
                    ></v-text-field>
                    <v-text-field
                        v-model="user.email"
                        hide-details="auto"
                        label="Email"
                        variant="outlined"
                        density="compact"
                        class="mb-4"
                        disabled
                    ></v-text-field>
                </v-col>
                <v-col
                    md="12"
                    cols="12"
                    class="text-right"
                >
                    <v-btn
                        color="primary"
                        variant="flat"
                        class="mb-4"
                        @click="submitForm"
                        :disabled="isLoading"
                        :loading="isLoading"
                    >
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script setup>
import { useNotification } from '@kyvg/vue3-notification';
import { ref, reactive, inject, watch } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const errorHandler = inject('errorHandler');
const { notify } = useNotification();
const api = inject('api');
const store = useStore();

const rules = {
    required: (value) => !!value || 'Required.',
};

const errors = ref({});
const isValid = ref(false);
const isLoading = ref(false);
const user = computed(() => store.state.user);

const submitForm = async () => {
    try {
        isLoading.value = true;
        await api.user.update(user.value);
        notify('Account updated successfully.');
    } catch (error) {
        errorHandler(error, (data, code) => {
            if (code === 422) errors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
}; 
</script>
