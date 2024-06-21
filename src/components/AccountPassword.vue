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
                    <h3>Update Password</h3>
                </v-col>
                <v-col
                    md="6"
                    cols="12"
                >
                    <v-text-field
                        v-model="password"
                        :error-messages="(errors.password) ? errors.password.msg : []"
                        hide-details="auto"
                        label="Current Password"
                        variant="outlined"
                        density="compact"
                        type="password"
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
                        v-model="newPassword"
                        :error-messages="(errors.newPassword) ? errors.newPassword.msg : []"
                        hide-details="auto"
                        label="New Password"
                        variant="outlined"
                        density="compact"
                        class="mb-4"
                        :rules="[rules.required]"
                        required
                        :append-inner-icon="isVisible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="isVisible ? 'text' : 'password'"
                        placeholder="Enter your new password"
                        @click:append-inner="isVisible = !isVisible"
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
import { ref, inject } from 'vue';

const errorHandler = inject('errorHandler');
const { notify } = useNotification();
const rules = inject('rules');
const api = inject('api');

const errors = ref({});
const password = ref('');
const newPassword = ref('');
const isVisible = ref(false);
const isValid = ref(false);
const isLoading = ref(false);

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
