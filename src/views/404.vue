<template>
    <v-app class="bg-gradient">
        <v-container class="fill-height">
            <v-responsive class="align-center fill-height">
                <v-row class="d-flex align-center justify-center">
                    <v-col cols="4">
                        <v-card
                            class="mx-auto text-center"
                            max-width="400"
                        >
                            <h1 class="text-h1">404</h1>
                            <h5 class="text-h4 mb-4">Page not found</h5>
                            <v-card-actions>
                                <v-btn
                                    block
                                    variant="flat"
                                    color="primary"
                                    @click="$router.push('/dashboard')"
                                >
                                    Go to Dashboard
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-responsive>
        </v-container>
    </v-app>
</template>


<script>

export default {

}

</script>
