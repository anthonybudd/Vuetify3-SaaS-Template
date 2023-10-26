<template>
    <v-container
        fluid
        class="px-0 py-0"
    >
        <v-row>
            <v-col>
                <p class="text-h4">Account</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    variant="text"
                    class="mr-4"
                    @click="view = 'Profile'"
                    :active="view === 'Profile'"
                >
                    Profile
                </v-btn>
                <v-btn
                    variant="text"
                    class="mr-4"
                    @click="view = 'Group'"
                    :active="view === 'Group'"
                >
                    Group
                </v-btn>
                <v-btn
                    variant="text"
                    class="mr-4"
                    @click="view = 'Billing'"
                    :active="view === 'Billing'"
                >
                    Billing
                </v-btn>
            </v-col>
        </v-row>

        <v-row v-if="view === 'Profile'">
            <v-col>
                <v-form v-model="isValidProfile">
                    <p class="text-h5">Profile</p>
                    <p class="text-h6 text-medium-emphasis font-weight-regular"><small>Update your email address and personal settings</small></p>
                    <v-divider class="mt-1"></v-divider>

                    <v-row class="mt-1">
                        <v-col
                            cols="12"
                            xs="12"
                            md="4"
                        >
                            <p class="text-h6 font-weight-regular">Email</p>
                        </v-col>
                        <v-col
                            cols="12"
                            xs="12"
                            md="4"
                        >
                            <v-text-field
                                v-model="_user.email"
                                label="Email"
                                variant="outlined"
                                density="compact"
                                hide-details="auto"
                                disabled
                            ></v-text-field>
                        </v-col>
                        <v-divider></v-divider>


                        <v-col
                            cols="12"
                            xs="12"
                            md="4"
                        >
                            <p class="text-h6 font-weight-regular">Name</p>
                        </v-col>
                        <v-col
                            cols="12"
                            xs="6"
                            sm="6"
                            md="2"
                        >
                            <v-text-field
                                v-model="_user.firstName"
                                :rules="rules.required"
                                label="First Name"
                                variant="outlined"
                                density="compact"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            xs="6"
                            sm="6"
                            md="2"
                        >
                            <v-text-field
                                v-model="_user.lastName"
                                :rules="rules.required"
                                label="Last Name"
                                variant="outlined"
                                density="compact"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-divider></v-divider>


                        <v-col
                            cols="12"
                            xs="12"
                            md="4"
                        >
                            <p class="text-h6 font-weight-regular">Bio</p>
                        </v-col>
                        <v-col
                            cols="12"
                            xs="12"
                            md="4"
                        >
                            <v-textarea
                                v-model="_user.bio"
                                label="Bio"
                                variant="outlined"
                                density="compact"
                                hide-details="auto"
                            ></v-textarea>
                        </v-col>
                        <v-divider></v-divider>

                        <v-col
                            xs="12"
                            md="8"
                            class="text-right"
                        >
                            <v-btn
                                color="primary"
                                @click="onClickUpdateProfile"
                                :loading="isLoading"
                                :disabled="!isValidProfile || isLoading"
                            >
                                Save
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>

        <v-row v-if="view === 'Group'">
            <v-col>
                <p class="text-h5">Group</p>
                <p class="text-h6 text-medium-emphasis font-weight-regular"><small>Add and remove users from your group</small></p>
                <v-divider class="mt-1"></v-divider>

                <v-row class="mt-1">
                    <v-col cols="4">
                        <p class="text-h6 font-weight-regular">Group Name</p>
                    </v-col>
                    <v-col
                        xs="12"
                        md="4"
                    >
                        <v-form v-model="isValidGroup">
                            <v-text-field
                                v-model="_group.name"
                                :rules="rules.required"
                                label="Group Name"
                                variant="outlined"
                                density="compact"
                                hide-details="auto"
                            ></v-text-field>
                        </v-form>
                    </v-col>
                    <v-divider></v-divider>

                    <v-col cols="4">
                        <p class="text-h6 font-weight-regular">User</p>
                    </v-col>
                    <v-col
                        xs="12"
                        md="4"
                    >
                        <v-form v-model="isValidInvite">
                            <v-text-field
                                v-model="inviteEmail"
                                label="Invite User"
                                variant="outlined"
                                :rules="rules.email"
                                density="compact"
                                @keydown.enter.prevent="onClickInviteUser"
                            >
                                <template v-slot:append-inner>
                                    <v-btn
                                        color="primary"
                                        :loading="isLoadingInvite"
                                        :disabled="!isValidInvite"
                                        @click="onClickInviteUser"
                                    >
                                        Invite User
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-form>

                        <v-data-table
                            :headers="headers"
                            :items="users"
                            item-value="name"
                            density="compact"
                            class="elevation-1 mt-4"
                        >
                            <template v-slot:item.name="{ item }">
                                <span v-if="item.selectable.firstName">
                                    {{ item.selectable.firstName }} {{ item.selectable.lastName }}
                                    <v-chip
                                        v-if="item.selectable.id === _group.ownerID"
                                        size="small"
                                    >
                                        Admin
                                    </v-chip>
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </template>
                            <template v-slot:item.email="{ item }">
                                <span v-if="item.selectable.email">
                                    {{ item.selectable.email }}
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-dialog
                                    v-model="item.dialog"
                                    max-width="400"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-if="item.selectable.id !== _user.id"
                                            v-bind="props"
                                            color="primary"
                                            size="small"
                                        >
                                            Remove
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="text-h5">Remove User</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <p>Are you sure you would like to remove this user from the group?</p>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="primary"
                                                variant="text"
                                                @click="item.dialog = false"
                                            >
                                                Close
                                            </v-btn>
                                            <v-btn
                                                color="danger"
                                                variant="flat"
                                                @click="onClickRemoveUser(item)"
                                                :loading="removingUserID == item.selectable.id"
                                            >
                                                Remove User
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </template>

                            <template v-slot:bottom></template>
                        </v-data-table>
                    </v-col>

                    <v-col
                        class="text-right"
                        cols="10"
                    >
                        <v-btn
                            color="primary"
                            @click="onClickUpdateGroup"
                            :loading="isLoading"
                            :disabled="!isValidGroup || isLoading"
                        >
                            Save
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row v-if="view === 'Billing'">
            <v-col>
                <p class="text-h5">Billing</p>
                <p class="text-h6 text-medium-emphasis font-weight-regular"><small>Set your billing info</small></p>
                <v-divider class="mt-1"></v-divider>

                <v-row class="mt-1">
                    <v-col
                        xs="12"
                        md="4"
                    >
                        <p class="text-h6 font-weight-regular">Card</p>
                    </v-col>
                    <v-col
                        xs="12"
                        md="4"
                    >
                        <v-alert
                            color="warning"
                            icon="$warning"
                            title="Warning"
                            max-width="800"
                            class="mb-4"
                            text="This tab is just for demo purposes, this form is not connected to the backend"
                        ></v-alert>

                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Card Number"
                                    variant="outlined"
                                    density="compact"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="MM/YY"
                                    variant="outlined"
                                    density="compact"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="CVC"
                                    variant="outlined"
                                    density="compact"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="Zip"
                                    variant="outlined"
                                    density="compact"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-divider></v-divider>

                    <v-col
                        cols="8"
                        class="text-right"
                    >
                        <v-btn color="primary">
                            Save
                        </v-btn>
                    </v-col>
                    <v-col cols="4"></v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            view: 'Profile', // Profile, Group, Billing
            isLoading: false,

            _user: {},
            isValidProfile: true,

            _group: {},
            isLoadingInvite: false,
            isValidInvite: false,
            isValidGroup: true,
            removingUserID: false,

            rules: {
                required: [
                    (v) => !!v || 'This is required',
                ],
                email: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Must be a valid E-mail address',
                ],
            },

            headers: [
                { title: 'Name', align: 'start', sortable: false, key: 'name' },
                { title: 'Email', align: 'start', key: 'email' },
                { title: '', align: 'start', key: 'actions' },
            ],
            users: [],
        };
    },

    computed: {
        ...mapGetters(['user', 'group']),
    },

    async mounted() {
        this._user = this.user;
        this._group = this.group;
        this.getData();
    },

    methods: {
        async getData() {
            const { data } = await this.$root.API.groups.get(this._group.id);
            this.users = data.Users;
        },

        async onClickUpdateProfile() {
            try {
                this.isLoading = true;
                await this.$root.API.user.update(this._user);
                this.$notify('Profle updated');
            } catch (error) {
                this.$root.errorHandler(error);
            } finally {
                this.isLoading = false;
            }
        },

        async onClickInviteUser() {
            try {
                this.isLoadingInvite = true;
                await this.$root.API.groups.invite(this._group.id, this.inviteEmail);
                await this.getData();
                this.$notify('User invited');
            } catch (error) {
                this.$root.errorHandler(error);
            } finally {
                this.isLoadingInvite = false;
            }
        },

        async onClickUpdateGroup() {
            try {
                this.isLoading = true;
                await this.$root.API.groups.update(this._group.id, this._group);
                this.$notify('Group updated');
            } catch (error) {
                this.$root.errorHandler(error);
            } finally {
                this.isLoading = false;
            }
        },

        async onClickRemoveUser(item) {
            try {
                this.removingUserID = item.selectable.id;
                await this.$root.API.groups.removeUser(this._group.id, this.removingUserID);
                this.getData();
                item.dialog = false;
                this.$notify('User Removed');
            } catch (error) {
                this.$root.errorHandler(error);
            } finally {
                this.removingUserID = false;
            }
        },
    }
};
</script>
