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
                    <p class="red--text mt-2">{{errorText}}</p>
                </v-list-item-content>
            </v-list-item>
        </v-card>

        <v-card
                class="mx-auto white pa-4 mt-5 white--text"
                outlined
                :elevation="2"

                max-width="900"
                v-if="organization"
                color="primary darken-1"
        >
            <v-list-item three-line class="text-center" v-if="organization.orgName">
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1 white--text"><b>{{organization.orgName}}</b>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-row no-gutters>
                <v-col
                        cols="12"
                        sm="12"
                        lg="6"
                >
                    <v-card-text class="white--text" v-if="organization.description">
                        {{organization.description}}
                    </v-card-text>
                    <template v-if="organization.contact">
                        <v-card-actions>
                            <v-btn v-if="organization.contact.donate" class="white" rounded @click="linkClicked(organization.contact.donate)">Donate
                            </v-btn>
                            <v-btn v-if="organization.contact.website" class="white" rounded @click="linkClicked(organization.contact.website)">Website
                            </v-btn>
                            <v-btn v-if="organization.contact.facebook" class="white" rounded @click="linkClicked(organization.contact.facebook)">Facebook
                            </v-btn>
                        </v-card-actions>
                    </template>
                </v-col>


                <v-col
                        cols="12"
                        sm="12"
                        lg="6">
                    <template v-if="organization.contact">
                        <div class="ma-4">
                            <!--                            <p v-if="organization.contact.phone" class="white&#45;&#45;text">-->
                            <!--                                <b class="teal&#45;&#45;text text&#45;&#45;accent-1">Phone: </b>-->
                            <!--                                <br>-->
                            <!--                                <span>{{organization.contact.phone}}</span>-->
                            <!--                            </p>-->
                            <p v-if="organization.contact.phones" class="white--text">
                                <b class="teal--text text--accent-1">Phones: </b>
                                <span v-for="(phone,index) in organization.contact.phones" :key="index">{{phone}}
                                <span v-if="index!==organization.contact.phones.length-1">, </span>
                                </span>
                            </p>

                            <p v-if="organization.contact.email" class="white--text">
                                <b class="teal--text text--accent-1">Email: </b>
                                <span>{{organization.contact.email}}</span>
                            </p>
                            <p v-if="organization.contact.website" class="white--text">
                                <b class="teal--text text--accent-1">Website: </b>
                                <span>{{organization.contact.website}}</span>
                            </p>
                            <p v-if="organization.contact.facebook" class="white--text">
                                <b class="teal--text text--accent-1">Facebook: </b>
                                <span>{{organization.contact.facebook}}</span>
                            </p>
                        </div>
                    </template>
                </v-col>

            </v-row>


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
                        class="primary darken-1"
                        dark
                >
                    <v-expansion-panel
                            v-for="(activity,index) in activities"
                            :key="index"
                            class="primary darken-2"
                    >
                        <v-expansion-panel-header v-if="activity.typeOfRelief">
                            <p>
                                <b class="teal--text text--accent-1">
                                    Relief Type:
                                </b>
                                <span class="white--text" v-for="(type,index) in activity.typeOfRelief" :key="index">
                                    {{type}}<span v-if="index!==activity.typeOfRelief.length-1">,</span>
                                </span>
                            </p>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-3 primary darken-2">
                            <template v-if="activity.supplyDate">
                                <p class="teal--text text--accent-1"><b>Supply Date:</b></p>
                                <p class="white--text"> {{new Date(activity.supplyDate).toDateString()}}</p>
                            </template>
                            <template v-if="activity.contents">
                                <p class="teal--text text--accent-1"><b>Contents:</b></p>
                                <p class="white--text">{{activity.contents}}</p>
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
                activities: [],

                errorText: null,
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
            this.errorText=null;

            this.organizations = this.$store.getters.getOrganizations;
            //console.log('amount of organizations: ',this.$store.getters.getOrganizations)

            if (this.organizations.length === 0) {

                this.organizationLoaderFlag = true;

                let params = {};

                let headers = {
                    'x-auth': localStorage.getItem('x-auth'),
                };

                let url = '/api/orgs';

                this.$apiRequestLog(url,params,headers);

                axios.get(url,
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res) => {
                        console.log("RESPONSE: ", res);
                        this.$store.commit('setOrganizations', res.data.orgNames);

                        this.organizations = this.$store.getters.getOrganizations;
                    }).catch(e => {
                        this.errorText = this.$errorMessage(e);
                        // console.log("ERROR: ",e);
                        // console.log("ERROR.RESPONSE: ", e.response);
                        //
                        // if(e.response && e.response.data && e.response.data.message){
                        //     this.errorText=e.response.data.message;
                        // }else{
                        //     this.errorText="Network error";
                        // }

                }).finally(() => {
                    console.log('FINISH');
                    this.organizationLoaderFlag = false;
                });
            }

            if(this.$route.params) {
                //console.log("passed organization name: ", this.$route.params.orgName);
                this.selectedOrganization=this.$route.params.orgName;
                this.searchClicked();
            }
        },
        methods: {
            linkClicked(link) {
                if (!/^https?:\/\//i.test(link)) {
                    link = 'http://' + link;
                }

                window.open(link);
            },
            searchClicked() {
                this.errorText=null;

                this.$v.$touch();
                if (this.$v.$anyError) {
                    return;
                }
                this.organization = null;
                this.activities = [];

                //console.log('selected organization: ', this.selectedOrganization);

                this.searchLoaderFlag = true;
                this.detailsLoadedFlag = false;


                let params = {
                    orgName: this.selectedOrganization,
                };
                let headers = {
                    'x-auth': localStorage.getItem('x-auth'),
                };

                let url = '/api/orgdetails';

                this.$apiRequestLog(url,params,headers);

                axios.get(url,
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res) => {
                        console.log("RESPONSE: ", res);
                        this.organization = res.data.organization;
                        this.activities = res.data.activities;
                    }).catch(e => {
                        this.errorText=this.$errorMessage(e);
                    // console.log("ERROR: ",e);
                    // console.log("ERROR.RESPONSE: ", e.response);
                    //
                    // if(e.response && e.response.data && e.response.data.message){
                    //     this.errorText=e.response.data.message;
                    // }else{
                    //     this.errorText="Network error";
                    // }
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