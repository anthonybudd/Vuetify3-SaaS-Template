<template>
    <v-container class="fill-height">
        <v-responsive class="align-center fill-height">
            <v-row class="d-flex align-center justify-center">
                <v-col cols="auto">
                    <v-card
                        class="mx-auto"
                        max-width="600"
                        min-width="400"
                        variant="elevated"
                    >
                        <v-form v-model="isValid">
                            <v-img
                                height="75"
                                class="my-4"
                                src="@/assets/logo.svg"
                            />
                            <v-card-title>
                                You have been invited to join this app.
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="invite.firstName"
                                            label="First Name"
                                            :rules="rules.required"
                                            :error-messages="errors?.firstName"
                                            variant="outlined"
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="invite.lastName"
                                            label="Last Name"
                                            :rules="rules.required"
                                            :error-messages="errors?.lastName"
                                            variant="outlined"
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-text-field
                                    v-model="invite.email"
                                    @keydown.enter.prevent="onClickLogin"
                                    label="Email"
                                    disabled
                                    variant="outlined"
                                    density="compact"
                                ></v-text-field>
                                <v-text-field
                                    v-model="invite.password"
                                    @keydown.enter.prevent="onClickLogin"
                                    :rules="rules.password"
                                    label="Password"
                                    variant="outlined"
                                    density="compact"
                                    type="password"
                                    required
                                ></v-text-field>

                                <v-row>
                                    <v-col class="pb-0">
                                        <v-checkbox
                                            hide-details="auto"
                                            v-model="invite.tos"
                                            value="tos-version-2023-07-13"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col
                                        cols="10"
                                        class="pb-0"
                                    >
                                        <p class="text-subtitle-1 mt-4">
                                            I agree to the <a href="#/link-to-your-tos">Terms of Service</a>
                                        </p>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        class="py-0"
                                        v-if="errors?.tos"
                                    >
                                        <p>{{ errors.tos }}</p>
                                    </v-col>
                                </v-row>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    variant="flat"
                                    min-width="140"
                                    :loading="isLoading"
                                    :disabled="!isValid || !invite.tos"
                                    @click="onClickSubmit"
                                >
                                    Join
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>
  
  
<script>

export default {
    data: () => ({
        isLoading: false,
        isValid: false,
        errors: {},

        invite: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            tos: ''
        },

        rules: {
            required: [
                (v) => !!v || 'This is required',
            ],
            password: [
                (v) => !!v || 'Password is required',
                (v) => (v.length > 7) || 'Password must be more than 8 characters',
                (v) => /[a-z]/.test(v) || 'Password must contain at least 1 lowercase letter',
                (v) => /[A-Z]/.test(v) || 'Password must contain at least 1 uppercase letter',
                (v) => /[0-9]/.test(v) || 'Password must contain at least 1 number',
            ],
        }
    }),

    computed: {
        inviteKey() {
            return this.$route.params.inviteKey;
        }
    },

    async mounted() {
        try {
            const { data: user } = await this.$root.API.auth.getUserByInviteKey(this.inviteKey);
            this.invite.email = user.email;
        } catch (error) {
            this.$notify({
                text: 'Invalid Link',
                type: 'error'
            });
        }
    },

    methods: {
        async onClickSubmit() {
            try {
                this.isLoading = false;
                this.invite.inviteKey = this.inviteKey;
                const { data } = await this.$root.API.auth.invite(this.invite);
                await this.$root.login(data.accessToken);
                this.$router.push('/dashboard');
            } catch (error) {
                await this.$root.errorHandler(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
  