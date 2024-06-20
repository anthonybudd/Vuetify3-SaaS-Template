<template>
    <v-card title="Delete Book">
        <v-card-text>
            <p>Are you sure you want to delete this book?</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                variant="text"
                :disabled="isLoading"
                @click="isActive = false"
            >Cancel</v-btn>
            <v-btn
                variant="flat"
                color="red"
                :disabled="isLoading"
                :loading="isLoading"
                @click="deleteBook"
            >Delete</v-btn>
        </v-card-actions>
    </v-card>
</template>


<script setup>
import { useNotification } from '@kyvg/vue3-notification';
import { ref, toRefs, inject } from 'vue';
import router from "@/plugins/router";

const { notify } = useNotification();
const errorHandler = inject('errorHandler');
const api = inject('api');
const props = defineProps({
    bookID: String,
    isActive: Object,
});

const { bookID, isActive } = toRefs(props);
const isLoading = ref(false);

const deleteBook = async () => {
    try {
        isLoading.value = true;
        await api.books.delete(bookID.value);
        notify('Book deleted');
        isActive.value = false;
        router.push(`/books`);
    } catch (error) {
        errorHandler(error);
    } finally {
        isLoading.value = false;
    }
};   
</script>