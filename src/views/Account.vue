<template>
    <nav-layout>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card class="flex d-flex flex-column">
                        <v-card-title>Account</v-card-title>
                        <v-card-text>
                            <v-form v-model="valid">
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="user.firstName"
                                                :rules="rules.firstName"
                                                label="First name"
                                                required
                                                outlined
                                                dense
                                            ></v-text-field>
                                        </v-col>

                                        <v-col
                                            cols="12"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="user.lastName"
                                                :rules="rules.lastName"
                                                label="Last name"
                                                required
                                                outlined
                                                dense
                                            ></v-text-field>
                                        </v-col>

                                        <v-col
                                            cols="12"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="user.email"
                                                :rules="rules.email"
                                                label="E-mail"
                                                disabled
                                                required
                                                outlined
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="mr-4"
                                type="submit"
                                color="primary"
                                :disabled="!valid"
                                :loading="isLoading"
                                @click="submit"
                            >
                                Submit
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card class="flex d-flex flex-column">
                        <v-card-title>Update Password</v-card-title>
                        <v-card-text>
                            <v-form v-model="validPassword">
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="password.password"
                                                :rules="rules.password"
                                                label="Current Password"
                                                type="password"
                                                required
                                                outlined
                                                dense
                                            ></v-text-field>
                                        </v-col>

                                        <v-col
                                            cols="12"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="password.newPassword"
                                                :rules="rules.password"
                                                label="New Password"
                                                type="password"
                                                required
                                                outlined
                                                dense
                                            ></v-text-field>
                                        </v-col>

                                        <v-col
                                            cols="12"
                                            md="4"
                                        >

                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="mr-4"
                                type="submit"
                                color="primary"
                                :disabled="!validPassword"
                                :loading="isLoadingUpdatePassword"
                                @click="updatePassword"
                            >
                                Update
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </nav-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import API from '@/services/API';

export default {
    name: 'Account',
    data() {
        return {
            isLoading: false,
            valid: false,

            validPassword: false,
            isLoadingUpdatePassword: false,
            password: {
                password: '',
                newPassword: '',
            },
        };
    },

    computed: {
        ...mapGetters(['user']),

        rules() {
            const rules = {
                firstName: [
                    (v) => !!v || 'First name is required',
                ],
                lastName: [
                    (v) => !!v || 'Last name is required',
                ],
                email: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail must be valid',
                ],

                password: [
                    (v) => !!v || 'Password is required',
                    (v) => (v.length > 7) || 'Password must be more than 8 characters',
                    (v) => /[a-z]/.test(v) || 'Password must contain at least 1 lowercase letter',
                    (v) => /[A-Z]/.test(v) || 'Password must contain at least 1 uppercase letter',
                    (v) => /[0-9]/.test(v) || 'Password must contain at least 1 number',
                ],
            };

            return rules;
        },
    },

    async mounted() {

    },

    methods: {
        async submit() {
            try {
                this.isLoading = true;
                await API.user.update(this.user);
            } catch (error) {
                this.$root.errorHandler(error);
            } finally {
                this.isLoading = false;
            }
        },

        async updatePassword() {
            try {
                this.isLoadingUpdatePassword = true;
                await API.user.updatePassword(this.password);
                this.$notify('Password Updated');
            } catch (error) {
                this.$root.errorHandler(error);
            } finally {
                this.isLoadingUpdatePassword = false;
            }
        },
    },
};
</script>
