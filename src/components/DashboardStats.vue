<template>
    <v-row>
        <v-col
            md="3"
            xs="6"
        >
            <v-card class="fill-height d-flex flex-column">
                <v-card-item title="Florida">
                    <template v-slot:subtitle>
                        <v-icon
                            class="me-1 pb-1"
                            color="error"
                            icon="mdi-alert"
                            size="18"
                        ></v-icon>

                        Extreme Weather Alert
                    </template>
                </v-card-item>

                <v-card-text class="py-0">
                    <v-row
                        align="center"
                        no-gutters
                    >
                        <v-col
                            class="text-h2"
                            cols="6"
                        >
                            64&deg;F
                        </v-col>

                        <v-col
                            class="text-right"
                            cols="6"
                        >
                            <v-icon
                                color="error"
                                icon="mdi-weather-hurricane"
                                size="88"
                            ></v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-expand-transition>
                    <div v-if="expand">
                        <div class="py-2">
                            <v-slider
                                v-model="time"
                                :max="6"
                                :step="1"
                                :ticks="labels"
                                class="mx-4"
                                color="primary"
                                density="compact"
                                show-ticks="always"
                                thumb-size="10"
                                hide-details
                            ></v-slider>
                        </div>

                        <v-list class="bg-transparent">
                            <v-list-item
                                v-for="item in forecast"
                                :key="item.day"
                                :append-icon="item.icon"
                                :subtitle="item.temp"
                                :title="item.day"
                            >
                            </v-list-item>
                        </v-list>
                    </div>
                </v-expand-transition>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn
                        :text="!expand ? 'Full Report' : 'Hide Report'"
                        @click="expand = !expand"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>

        <v-col
            md="3"
            xs="6"
        >
            <v-card class="fill-height d-flex flex-column">
                <v-card-item title="New Books">
                    <template v-slot:subtitle>
                        New Books This Month
                    </template>
                </v-card-item>
                <v-card-text class="py-0">
                    <v-row
                        align="center"
                        no-gutters
                    >
                        <v-col
                            class="text-h2"
                            cols="6"
                        >
                            +43
                        </v-col>

                        <v-col
                            class="text-right"
                            cols="6"
                        >
                            <v-icon
                                color="success"
                                icon="mdi-book"
                                size="88"
                            ></v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                        text="Books"
                        to="/books"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>

        <v-col
            md="3"
            xs="6"
        >
            <v-card class="fill-height">
                <v-card-item title="Sparkline">
                    <template v-slot:subtitle>
                        Random Sparkline
                    </template>
                </v-card-item>
                <v-card-text class="py-0">
                    <br>
                    <v-sparkline
                        height="100"
                        :auto-line-width="autoLineWidth"
                        :fill="fill"
                        :gradient="gradient"
                        :gradient-direction="gradientDirection"
                        :line-width="width"
                        :model-value="value"
                        :padding="padding"
                        :smooth="true"
                        :stroke-linecap="lineCap"
                        :type="type"
                        auto-draw
                    ></v-sparkline>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col
            md="3"
            xs="6"
        >
            <v-card class="fill-height  d-flex flex-column">
                <v-card-item title="Storage Used"></v-card-item>
                <v-card-text>
                    <div class="text-green-darken-3 text-h2 font-weight-bold">90%</div>
                    <br>
                    <div
                        :style="`right: calc(20% - 32px)`"
                        class="position-absolute mt-n8 text-caption text-green-darken-3"
                    >
                        1.4 TiB
                    </div>
                    <v-progress-linear
                        color="green-darken-3"
                        height="22"
                        model-value="90"
                        rounded="lg"
                    >
                    </v-progress-linear>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn to="/account">Account</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';

const labels = ref({ 0: 'SU', 1: 'MO', 2: 'TU', 3: 'WED', 4: 'TH', 5: 'FR', 6: 'SA' });
const expand = ref(false);
const time = ref(0);
const forecast = ref([
    { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
    { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
    { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
]);

const gradientsArr = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
];


const width = ref(2);
const radius = ref(10);
const padding = ref(8);
const lineCap = ref('round');
const gradient = ref(gradientsArr[5]);
const value = ref([0, 2, 5, 9, 5, 10, 3, 5, 0, 0,]);
const gradientDirection = ref('top');
const gradients = ref(gradientsArr);
const fill = ref(false);
const type = ref('trend');
const autoLineWidth = ref(false);

</script>
