<template>
    <v-container>
        <h1 class="text-h5 font-weight-bold mb-4">Dashboard</h1>

        <v-row>
            <v-col>
                <v-alert
                    v-if="!user.emailVerified && !verifyEmailSent"
                    density="compact"
                    title="Verify your email"
                    close-label="Close Alert"
                    type="warning"
                    border="start"
                    variant="tonal"
                    closable
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

        <DashboardStats></DashboardStats>

        <v-row>
            <v-col
                md="6"
                xs="12"
            >
                <v-card class="fill-height">
                    <v-card-item title="Total Revenue"></v-card-item>
                    <v-card-text>
                        <div class="text-green-darken-4 text-h2 font-weight-bold">
                            $16,334.17

                            <v-chip
                                color="green"
                                variant="flat"
                                size="large"
                            >
                                2.46% <v-icon
                                    class="ml-1"
                                    icon="mdi-arrow-top-right"
                                    size="20"
                                ></v-icon>
                            </v-chip>
                        </div>
                        <div style="height: 300px; padding: 10px">
                            <Line
                                :data="lineChart.data"
                                :options="lineChart.options"
                            />
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col
                md="6"
                xs="12"
            >
                <v-card class="fill-height">
                    <v-card-item title="Primary Customers"></v-card-item>
                    <v-card-text>
                        <div style="height: 300px; padding: 10px">
                            <Pie
                                :data="pieChart"
                                :options="pieChart.options"
                            />
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import DashboardStats from '@/components/DashboardStats.vue';
import { ref, computed, inject, onMounted } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend } from 'chart.js';
import { Line, Pie } from 'vue-chartjs';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend);

const user = computed(() => store.state.user);
const { notify } = useNotification();
const verifyEmailSent = ref(false);
const isLoading = ref(false);
const api = inject('api');
const store = useStore();

const lineChart = {
    data: {
        labels: Array.from(Array(14).keys()).map((i) => dayjs().subtract(i, 'days').format('D MMM')).reverse(),
        datasets: [
            {
                label: 'Daily Sales',
                tension: 0.3,
                data: Array.from(Array(14).keys()).map(() => Math.floor(Math.random() * (600 - 200 + 1)) + 200).reverse(),
            },
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
        },
        tooltips: {
            enabled: false
        },
        scales: {
            x: {
                grid: {
                    drawBorder: false,
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    precision: 0,
                },
            }
        }
    }
};

const pieChart = {
    labels: ['50+', '30-39', '18-29', '40-49'],
    options: {
        responsive: true,
        maintainAspectRatio: false
    },
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
        }
    ]
};




onMounted(async () => {

});

const resendVerificationEmail = async () => {
    try {
        isLoading.value = true;
        await api.user.resendVerificationEmail();
        notify('Verification email sent. Check your inbox.');
        verifyEmailSent.value = true;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};  
</script>