<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col v-for="(variant, i) in variants" :key="i" cols="3">
                <v-card class="mx-auto" color="primary" :variant="variant">
                    <v-card-item>
                        <div>
                            <div class="text-overline mb-1">
                                {{ variant }}
                            </div>
                            <div class="text-h6 mb-1">
                                Headline
                            </div>
                            <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
                        </div>
                    </v-card-item>

                    <v-card-actions>
                        <v-btn>
                            Button
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-row dense>
            <v-col cols="4">
                <v-card class="mx-auto">
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
                            <v-col class="text-h2" cols="6">
                                23&deg;C
                            </v-col>
                            <v-col cols="6">
                                <v-img src="https://cdn.vuetifyjs.com/images/cards/sun.png" alt="Sunny image"
                                    width="92"></v-img>
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

                    <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks></v-slider>

                    <v-list class="transparent">
                        <v-list-item v-for="item in forecast" :key="item.day">
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

            <v-col cols="4">
                <v-card>
                    <v-img height="200" src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg" cover
                        class="text-white">
                        <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
                            <template v-slot:prepend>
                                <v-btn icon="$menu"></v-btn>
                            </template>

                            <v-toolbar-title class="text-h6">
                                Messages
                            </v-toolbar-title>

                            <template v-slot:append>
                                <v-btn icon="mdi-dots-vertical"></v-btn>
                            </template>
                        </v-toolbar>
                    </v-img>

                    <v-card-text>
                        <div class="font-weight-bold ms-1 mb-2">
                            Today
                        </div>

                        <v-timeline density="compact" align="start">
                            <v-timeline-item v-for="message in messages" :key="message.time" :dot-color="message.color"
                                size="x-small">
                                <div class="mb-4">
                                    <div class="font-weight-normal">
                                        <strong>{{ message.from }}</strong> @{{ message.time }}
                                    </div>
                                    <div>{{ message.message }}</div>
                                </div>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>


            </v-col>

            <v-col cols="4">
                <v-card class="mb-2" color="#385F73" theme="dark">
                    <v-card-title class="text-h5">
                        Unlimited music now
                    </v-card-title>

                    <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and
                        offline.</v-card-subtitle>

                    <v-card-actions>
                        <v-btn variant="text">
                            Listen Now
                        </v-btn>
                    </v-card-actions>
                </v-card>

                <v-card class="mb-2" color="#1F7087" theme="dark">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title class="text-h5">
                                Supermodel
                            </v-card-title>

                            <v-card-subtitle>Foster the People</v-card-subtitle>

                            <v-card-actions>
                                <v-btn class="ms-2" variant="outlined" size="small">
                                    START RADIO
                                </v-btn>
                            </v-card-actions>
                        </div>

                        <v-avatar class="ma-3" size="125" rounded="0">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                        </v-avatar>
                    </div>
                </v-card>

                <v-card class="mb-2" color="#952175" theme="dark">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title class="text-h5">
                                Halcyon Days
                            </v-card-title>

                            <v-card-subtitle>Ellie Goulding</v-card-subtitle>

                            <v-card-actions>
                                <v-btn class="ms-2" icon="mdi-play" variant="text"></v-btn>
                            </v-card-actions>
                        </div>

                        <v-avatar class="ma-3" size="125" rounded="0">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
                        </v-avatar>
                    </div>
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
        variants: ['elevated', 'flat', 'tonal', 'outlined'],

        labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
        time: 0,
        forecast: [
            { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
            { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
            { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
        ],
        messages: [
            {
                from: 'You',
                message: `Sure, I'll see you later.`,
                time: '10:42am',
                color: 'deep-purple-lighten-1',
            },
            {
                from: 'John Doe',
                message: 'Yeah, sure. Does 1:00pm work?',
                time: '10:37am',
                color: 'green',
            },
            {
                from: 'You',
                message: 'Did you still want to grab lunch today?',
                time: '9:47am',
                color: 'deep-purple-lighten-1',
            },
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
