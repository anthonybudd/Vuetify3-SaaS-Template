<template>
    <v-container fluid>
        <v-row dense>
            <v-col cols="12">
                <v-card>
                    <v-row>
                        <v-col cols="3">

                            <v-row>
                                <v-col cols="12">
                                    <v-icon
                                        icon="mdi-view-dashboard"
                                        size="large"
                                    />
                                </v-col>
                                <v-col cols="8">
                                    <v-row align="center">
                                        <v-col
                                            class="text-h2"
                                            cols="6"
                                        >
                                            23&deg;C
                                        </v-col>
                                        <v-col cols="6">
                                            <v-img
                                                src="https://cdn.vuetifyjs.com/images/cards/sun.png"
                                                alt="Sunny image"
                                                width="92"
                                            ></v-img>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>

                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="3">x</v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="3">x</v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="3">x</v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <v-row dense>
            <v-col cols="4">
                <v-card
                    class="mx-auto"
                    max-width="400"
                >
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title class="text-h5">
                                San Francisco
                            </v-list-item-title>
                            <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-card-text>
                        <v-row align="center">
                            <v-col
                                class="text-h2"
                                cols="6"
                            >
                                23&deg;C
                            </v-col>
                            <v-col cols="6">
                                <v-img
                                    src="https://cdn.vuetifyjs.com/images/cards/sun.png"
                                    alt="Sunny image"
                                    width="92"
                                ></v-img>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-send</v-icon>
                        </v-list-item-icon>
                        <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-cloud-download</v-icon>
                        </v-list-item-icon>
                        <v-list-item-subtitle>48%</v-list-item-subtitle>
                    </v-list-item>

                    <v-slider
                        v-model="time"
                        :max="6"
                        :tick-labels="labels"
                        class="mx-4"
                        ticks
                    ></v-slider>

                    <v-list class="transparent">
                        <v-list-item
                            v-for="item in forecast"
                            :key="item.day"
                        >
                            <v-list-item-title>{{ item.day }}</v-list-item-title>

                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-subtitle class="text-right">
                                {{ item.temp }}
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn text>
                            Full Report
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    data: () => ({
        loading: false,
        buttons: [],

        labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
        time: 0,
        forecast: [
            { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
            { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
            { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
        ],
    }),

    computed: {
        ...mapGetters(['user', 'group']),
    },

    async mounted() {

    },

    methods: {

    },
}

</script>
