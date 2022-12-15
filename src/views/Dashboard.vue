<template>
    <nav-layout>
        <v-container>
            <v-row>
                <v-col
                    md="6"
                    cols="12"
                >
                    <v-card>
                        <v-img
                            height="200px"
                            src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                        >
                            <v-card-title class="white--text mt-8">
                                <v-avatar size="56">
                                    <img
                                        alt="user"
                                        src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                                    >
                                </v-avatar>
                                <p class="ml-3">
                                    John Doe
                                </p>
                            </v-card-title>
                        </v-img>

                        <v-card-text>
                            <div class="font-weight-bold ml-8 mb-2">
                                Today
                            </div>

                            <v-timeline
                                align-top
                                dense
                            >
                                <v-timeline-item
                                    v-for="message in messages"
                                    :key="message.time"
                                    :color="message.color"
                                    small
                                >
                                    <div>
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

                <v-col
                    md="6"
                    cols="12"
                >
                    <v-card
                        class="mx-auto"
                        color="#26c6da"
                        dark
                    >
                        <v-card-title>
                            <v-icon
                                large
                                left
                            >
                                mdi-twitter
                            </v-icon>
                            <span class="text-h6 font-weight-light">Twitter</span>
                        </v-card-title>

                        <v-card-text class="text-h5 font-weight-bold">
                            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                        </v-card-text>

                        <v-card-actions>
                            <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3">
                                    <v-img
                                        class="elevation-6"
                                        alt=""
                                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                    ></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Evan You</v-list-item-title>
                                </v-list-item-content>

                                <v-row
                                    align="center"
                                    justify="end"
                                >
                                    <v-icon class="mr-1">
                                        mdi-heart
                                    </v-icon>
                                    <span class="subheading mr-2">256</span>
                                    <span class="mr-1">·</span>
                                    <v-icon class="mr-1">
                                        mdi-share-variant
                                    </v-icon>
                                    <span class="subheading">45</span>
                                </v-row>
                            </v-list-item>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </nav-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    data() {
        return {
            messages: [
                {
                    from: 'You',
                    message: `Sure, I'll see you later.`,
                    time: '10:42am',
                    color: 'deep-purple lighten-1',
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
                    color: 'deep-purple lighten-1',
                },
            ]
        };
    },

    async mounted() {

    },
};
</script>
