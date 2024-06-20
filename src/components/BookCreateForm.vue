<template>
    <v-card title="Create Book">
        <v-card-text>
            <v-form
                v-model="isValid"
                @submit.prevent="submitForm"
                class="pt-2"
            >
                <v-text-field
                    v-model="book.name"
                    :error-messages="(errors.name) ? errors.name.msg : []"
                    hide-details="auto"
                    label="Name"
                    variant="outlined"
                    density="compact"
                    class="mb-4"
                    :rules="[rules.required]"
                    required
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="grey-darken-3"
                variant="flat"
                :disabled="isLoading || !isValid"
                @click="submitForm"
            >Create</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useNotification } from '@kyvg/vue3-notification';
import router from "@/plugins/router";
import { ref, inject } from 'vue';

const { notify } = useNotification();
const errorHandler = inject('errorHandler');
const api = inject('api');

const rules = {
    required: (value) => !!value || 'Required.',
};

const errors = ref({});
const book = ref({});
const isValid = ref(false);
const isLoading = ref(false);

const submitForm = async () => {
    try {
        isLoading.value = true;
        const { data } = await api.books.create(book.value);
        router.push(`/books/${data.id}`);
        notify('Book created');
    } catch (error) {
        errorHandler(error, (data, code) => {
            if (code === 422) errors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
};   
</script>