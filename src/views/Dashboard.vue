<template>
    <div class="bg-grey-lighten-3">
        <v-container>
            <h1 class="text-h5 font-weight-bold">Dashboard</h1>
        </v-container>
    </div>
    <div>
        <v-container>

            <v-row v-if="!user.emailVerified">
                <v-col>
                    <v-alert
                        density="compact"
                        title="Verify your email"
                        type="warning"
                        border="start"
                        variant="tonal"
                        prominent
                    >
                        You must verify your email address. Click the button below to resend the verification email.
                        <br>

                        <v-btn
                            @click="resendVerificationEmail"
                            :disabled="isLoading"
                            :loading="isLoading"
                            size="small"
                            variant="flat"
                        >
                            Resend Verification Email
                        </v-btn>
                    </v-alert>
                </v-col>
            </v-row>

            <!-- <DashboardStats :stats="stats"></DashboardStats> -->

            <!-- <v-row>
                <v-col
                    md="6"
                    xs="12"
                >
                    <v-sheet
                        width="100%"
                        rounded
                        border
                    >
                        <h3 class="mt-2 text-center">Sales per day</h3>
                        <div style="height: 500px; padding: 10px">
                            <Line
                                v-if="!isLoading"
                                :data="data"
                                :options="options"
                            />
                        </div>
                    </v-sheet>
                </v-col>
                <v-col
                    md="6"
                    xs="12"
                >
                    <ChargePointMap />
                </v-col>
            </v-row> -->
        </v-container>
    </div>
</template>


<script setup>
import DashboardStats from '@/components/DashboardStats.vue';
import { ref, computed, inject, onMounted } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import { useStore } from 'vuex';

const user = computed(() => store.state.user);
const { notify } = useNotification();
const isLoading = ref(false);
const api = inject('api');
const store = useStore();

onMounted(async () => {

});

const resendVerificationEmail = async () => {
    try {
        isLoading.value = true;
        await api.user.resendVerificationEmail();
        notify('Verification email sent. Check your inbox.');
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};  
</script>