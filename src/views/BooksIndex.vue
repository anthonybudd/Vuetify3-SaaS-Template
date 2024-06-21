<template>
    <v-container>
        <h1 class="text-h5 font-weight-bold mb-4">Books</h1>

        <v-row v-if="requestFailed">
            <v-col>
                <v-alert
                    density="compact"
                    title="Template Page"
                    color="deep-purple-accent-4"
                    close-label="Close Alert"
                    class="mb-4"
                    type="warning"
                    border="start"
                    variant="tonal"
                    prominent
                    closable
                >
                    This page is just a template, by default the backend does not come with the routes for this
                    page.
                    <br>
                    You must create these routes yourself by running the code generation command below in the root
                    of the <b>Backend</b>
                    <br>
                    <div class="code">
                        <pre>
<code>npm run generate -- --model="Book"
npm run _db:refresh</code>
                        </pre>
                    </div>
                </v-alert>
            </v-col>
        </v-row>


        <v-sheet
            width="100%"
            class=""
            rounded
            border
        >
            <v-container class="px-4 py-4 d-flex align-center justify-center">
                <v-text-field
                    v-model="search"
                    label="Search"
                    variant="outlined"
                    density="compact"
                    width="300"
                ></v-text-field>

                <v-spacer></v-spacer>

                <v-dialog
                    max-width="500"
                    :fullscreen="xs"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            class="mx-2"
                            color="primary"
                            variant="flat"
                            :disabled="requestFailed"
                        >
                            + Add New
                        </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <BookCreateForm></BookCreateForm>
                    </template>
                </v-dialog>
            </v-container>

            <v-data-table
                :search="search"
                :headers="headers"
                :items="items"
                :loading="isLoading"
            >
                <template v-slot:item.id="{ item }">
                    <small>
                        {{ item.id }}
                    </small>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn
                        variant="tonal"
                        size="small"
                        :to="`/books/${item.id}`"
                    >
                        Open
                    </v-btn>
                </template>
            </v-data-table>
        </v-sheet>
    </v-container>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
const api = inject('api');
import BookCreateForm from './../components/BookCreateForm.vue';

const { xs } = useDisplay();

const isLoading = ref(true);
const requestFailed = ref(false);
const items = ref([]);
const search = ref('');
const headers = [
    { title: 'Name', key: 'name' },
    { title: 'ID', key: 'id' },
    { title: 'Actions', key: 'actions' }
];

onMounted(async () => {
    try {
        const { data } = await api.books.index();
        items.value = data;
    } catch (error) {
        requestFailed.value = true;
    } finally {
        isLoading.value = false;
    }
});
</script>