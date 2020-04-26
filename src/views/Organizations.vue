<template>
    <div>
        <v-card
                class="mx-auto white text-center"
                max-width="344"
                outlined
                :elevation="12"
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Organizations</v-list-item-title>
                    <v-divider></v-divider>
                    <v-autocomplete
                            v-model="selectedOrganization"
                            :loading="organizationLoaderFlag"
                            :items="organizations"
                            :search-input.sync="select"
                            cache-items
                            :disabled="organizationLoaderFlag"
                            flat
                            hide-no-data
                            hide-details
                            :label="organizationLoaderFlag?'Loading Names of organizations...':'Type name of organization:' "
                            @input="$v.selectedOrganization.$touch()"
                            @blur="$v.selectedOrganization.$touch()"
                            :error-messages="selectedOrganizationErrors"
                    ></v-autocomplete>
                    <v-btn text class="primary mx-auto mt-3" dark rounded :loading="searchLoaderFlag"
                           :disabled="organizationLoaderFlag" @click="searchClicked">Search
                    </v-btn>

                </v-list-item-content>
            </v-list-item>
        </v-card>

        <v-card
                class="mx-auto white pa-4 mt-5"
                outlined
                :elevation="2"
                style="width: 90vw"
                v-if="organization"
        >
            <v-list-item three-line class="text-center" v-if="organization.orgName">
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{organization.orgName}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-card-text v-if="organization.description">
                {{organization.description}}
            </v-card-text>

            <v-card-actions>
                <v-btn class="blue-grey" dark>Donate</v-btn>
                <v-btn class="blue-grey" dark>Website</v-btn>
                <v-btn class="blue-grey" dark>Facebook</v-btn>
            </v-card-actions>

            <template v-if="organization.contact">
                <v-card-text v-if="organization.contact.phone">
                    Phone: {{organization.contact.phone}}
                </v-card-text>
                <v-card-text v-if="organization.contact.email">
                    Email: {{organization.contact.email}}
                </v-card-text>
                <v-card-text v-if="organization.contact.website">
                    Website: {{organization.contact.website}}
                </v-card-text>
                <v-card-text v-if="organization.contact.facebook">
                    Facebook: {{organization.contact.facebook}}
                </v-card-text>
            </template>

            <template v-if="activities.length!==0">
                <v-card-title>Relief Records:</v-card-title>
                <v-expansion-panels
                        :accordion="false"
                        :popout="true"
                        :inset="false"
                        :multiple="false"
                        :focusable="true"
                        :disabled="false"
                        :readonly="false"
                        :flat="false"
                        :hover="false"
                        :tile="false"
                >
                    <v-expansion-panel
                            v-for="(activity,index) in activities"
                            :key="index"
                    >
                        <v-expansion-panel-header v-if="activity.typeOfRelief">
                            <!--                        <p>Location: Uttara, Dhaka</p>-->
                            <p>Relief Type: <span v-for="(type,index) in activity.typeOfRelief"
                                                  :key="index">{{type}} </span></p>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-3">
                            <template v-if="activity.supplyDate">
                                <p><b>Supply Date:</b></p>
                                <p> {{new Date(activity.supplyDate).toDateString()}}</p>
                            </template>
                            <template v-if="activity.contents">
                                <p><b>Contents:</b></p>
                                <p>{{activity.contents}}</p>
                            </template>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </template>
        </v-card>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import axios from "axios";

    export default {
        name: "Organization",

        validations: {
            selectedOrganization: {required},
        },

        data: () => {
            return {
                detailsLoadedFlag: false,
                searchLoaderFlag: false,
                organizationLoaderFlag: false,

                organizations: [],
                selectedOrganization: null,
                select: "",

                reliefs: [],

                organization: null,
                activities: []
            }
        },
        components: {},
        computed: {
            selectedOrganizationErrors() {
                const errors = [];
                if (!this.$v.selectedOrganization.$dirty) return errors;
                !this.$v.selectedOrganization.required && errors.push('Organization name is required.');
                return errors
            }
        },
        created() {
            this.organizations = this.$store.getters.getOrganizations;
            //console.log('amount of organizations: ',this.$store.getters.getOrganizations)

            if (this.organizations.length === 0) {
                let params = {};

                let headers = {
                    'x-auth': localStorage.getItem('x-auth'),
                };

                console.log('PARAMS: ', params);

                if (headers["x-auth"]) {
                    console.log("USER IS AUTHORIZED");
                } else {
                    console.log("USER IS NOT AUTHORIZED");
                }

                this.organizationLoaderFlag = true;
                axios.get('/api/orgs',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res) => {
                        console.log("RESPONSE: ", res);
                        //console.log('received organization names: ', res.data.orgNames);
                        this.$store.commit('setOrganizations', res.data.orgNames);
                        this.organizations = this.$store.getters.getOrganizations;
                    }).catch(e => {
                    console.log("ERROR: ", e.response);
                }).finally(() => {
                    console.log('FINISH');
                    this.organizationLoaderFlag = false;
                });
            }
        },
        methods: {
            searchClicked() {
                this.$v.$touch();
                if (this.$v.$anyError) {
                    return;
                }
                this.organization = null;
                this.activities = [];

                console.log('selected organization: ', this.selectedOrganization);
                this.searchLoaderFlag = true;
                this.detailsLoadedFlag = false;


                let params = {
                    orgName: this.selectedOrganization,
                };
                let headers = {
                    'x-auth': localStorage.getItem('x-auth'),
                };

                console.log('PARAMS: ', params);

                if (headers["x-auth"]) {
                    console.log("USER IS AUTHORIZED");
                } else {
                    console.log("USER IS NOT AUTHORIZED");
                }

                axios.get('/api/orgdetails',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res) => {
                        console.log("RESPONSE: ", res);

                        this.organization = res.data.organization;
                        this.activities = res.data.activities;
                    }).catch(e => {
                    console.log("ERROR: ", e.response);
                }).finally(() => {
                    console.log('FINISH');
                    this.searchLoaderFlag = false;
                    this.detailsLoadedFlag = true;
                });
            }
        }
    }
</script>

<style scoped>

</style>