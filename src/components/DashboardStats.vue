<template>
    <v-row>
        <v-col
            md="3"
            xs="6"
        >
            <v-card class="fill-height">
                <v-card-title class="text-overline">
                    Total Earnings
                    <div
                        class="text-green-darken-3 text-h3 font-weight-bold"
                        v-if="stats.totalEarnings"
                    >
                        {{ $currency(stats.totalEarnings, 'USD') }}
                    </div>
                    <div class="text-h6 text-medium-emphasis font-weight-regular">
                        Past 30 days
                    </div>
                </v-card-title>
            </v-card>
        </v-col>

        <v-col
            md="3"
            xs="6"
        >
            <v-card class="fill-height">
                <v-card-title class="text-overline">
                    Active Charge Points
                </v-card-title>
                <v-card-text class="py-0">
                    <v-row
                        align="center"
                        no-gutters
                    >
                        <v-col
                            class="text-h2"
                            cols="6"
                            v-if="stats.activeChargePoints !== null"
                        >
                            {{ stats.activeChargePoints }}
                        </v-col>

                        <v-col
                            class="text-right"
                            cols="6"
                        >
                            <v-icon
                                color="success"
                                icon="mdi-ev-station"
                                size="88"
                            ></v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col
            md="3"
            xs="6"
        >
            <v-card class="fill-height">
                <v-card-title class="text-overline">
                    Average Rating
                </v-card-title>

                <v-tooltip
                    v-if="stats.averageRating"
                    :text="stats.averageRating"
                    location="top"
                >
                    <template v-slot:activator="{ props }">
                        <v-card-text
                            v-bind="props"
                            class="py-0"
                        >
                            <v-icon
                                v-for="i in stats.averageRatingInt"
                                :key="i"
                                icon="mdi-star"
                                color="yellow"
                                size="40"
                            ></v-icon>
                            <v-icon
                                v-if="stats.averageRating % 1 !== 0"
                                icon="mdi-star-half"
                                color="yellow"
                                size="40"
                            ></v-icon>
                        </v-card-text>
                    </template>
                </v-tooltip>
                <v-card-text
                    class="py-0"
                    v-else
                >
                    <v-icon
                        icon="mdi-star-half"
                        color="yellow"
                        size="40"
                    ></v-icon>
                </v-card-text>
                <v-card-title class="text-overline">
                    <div class="text-h6 text-medium-emphasis font-weight-regular">
                        Past 30 days
                    </div>
                </v-card-title>
            </v-card>
        </v-col>

        <v-col
            md="3"
            xs="6"
        >
            <v-card class="fill-height">
                <v-card-title class="text-overline">
                    Balance
                </v-card-title>
                <v-card-text class="py-0">
                    <v-row
                        align="center"
                        no-gutters
                    >
                        <v-col class="text-h3">
                            <span v-if="stats.balance">
                                {{ $currency(stats.balance, 'USD') }}
                            </span>
                            <br>
                            <br>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    stats: Object
});

const { stats } = toRefs(props);
</script>
