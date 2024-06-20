<template>
    <div class="bg-grey-lighten-3">
        <v-container>
            <v-row>
                <v-col>
                    <span class="text-h5 font-weight-bold">Book: <span v-if="book.name">{{ book.name }}</span></span>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-dialog
                        v-model="editDialoge"
                        max-width="400"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                text="Edit"
                                size="small"
                                class="mr-2"
                                variant="flat"
                            ></v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <BookUpdateForm
                                :bookID="bookID"
                                @onClose="onClose"
                            ></BookUpdateForm>
                        </template>
                    </v-dialog>
                    <v-dialog max-width="400">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                text="Delete"
                                color="red"
                                size="small"
                                class="mr-2"
                                variant="flat"
                            ></v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <BookDeleteConfirmation
                                :bookID="bookID"
                                :isActive="isActive"
                            ></BookDeleteConfirmation>
                        </template>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div>
        <v-container>
            <v-row>
                <v-col cols="8">
                    <v-sheet
                        variant="outlined"
                        class="mx-auto"
                        border
                        rounded
                    >
                        <v-row>
                            <v-col cols="12">
                                <v-card-title class="text-overline">
                                    Name
                                    <div class="text-h3">
                                        {{ book.name }}
                                    </div>
                                </v-card-title>
                            </v-col>
                            <v-col cols="6">
                                <v-card-title class="text-overline">
                                    Created At
                                    <div class="text-h4">
                                        {{ $formatDate(book.createdAt) }}
                                    </div>
                                </v-card-title>
                            </v-col>
                            <v-col cols="6">
                                <v-card-title class="text-overline">
                                    Updated At
                                    <div class="text-h4">
                                        {{ $formatDate(book.updatedAt) }}
                                    </div>
                                </v-card-title>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BookUpdateForm from './../components/BookUpdateForm.vue';
import BookDeleteConfirmation from './../components/BookDeleteConfirmation.vue';

const api = inject('api');
const route = useRoute();
const bookID = route.params.bookID;

const book = ref({});
const isLoading = ref(true);
const editDialoge = ref(false);

onMounted(async () => {
    await getData();
    isLoading.value = false;
});

const getData = async () => {
    const { data } = await api.books.get(bookID);
    book.value = data;
};

const onClose = () => {
    editDialoge.value = false;
    getData();
};  
</script>