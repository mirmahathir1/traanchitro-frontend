<template>
    <v-card max-width="400" style="position: fixed; top:7vh; right:0px">
        <v-btn icon v-if="!enabled" @click="enabled=true">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <template v-else>
            <v-card-title>
                <v-btn icon @click="enabled=false">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                Filter Search
            </v-card-title>
            <v-divider></v-divider>

            <v-container>
                <v-row no-gutters>
                    <v-col
                            :cols="4"
                    >
                        <p>Type of Relief:</p>
                        <v-checkbox hide-details v-model="selectedTypes" dense label="Food" value="FOOD"></v-checkbox>
                        <v-checkbox hide-details v-model="selectedTypes" dense label="PPE" value="PPE"></v-checkbox>
                        <v-checkbox hide-details v-model="selectedTypes" dense label="Sanitizer" value="SANITIZER"></v-checkbox>
                        <v-checkbox hide-details v-model="selectedTypes" dense label="Mask" value="MASK"></v-checkbox>
                        <v-checkbox hide-details v-model="selectedTypes" dense label="Glove" value="GLOVE"></v-checkbox>


                    </v-col>
                    <v-col
                            :cols="8"
                    >
                        <p>Filter by Organization:</p>
                        <v-autocomplete
                                v-model="selectedOrganization"
                                :items="organizations"
                                :search-input.sync="select"
                                :loading="organizationLoaderFlag"
                                :disabled="organizationLoaderFlag"
                                cache-items
                                flat
                                hide-no-data
                                hide-details
                                :label="organizationLoaderFlag?'Loading Names of organizations...':'Type name of organization:' "
                                class="mb-3"
                        ></v-autocomplete>

                        <p>Schedule:</p>
                        <template v-if="$store.getters.getLoggedIn">
                            <v-radio-group v-model="schedule">
                                <v-radio
                                        :label="'Past Delivery'"
                                        :value="'PAST'"
                                ></v-radio>
                                <v-radio
                                        :label="'Scheduled Delivery'"
                                        :value="'FUTURE'"
                                ></v-radio>
                            </v-radio-group>
                        </template>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="resetFilter()">Reset Filter</v-btn>
                <v-btn color="primary" text @click="filterSearch">Search</v-btn>
            </v-card-actions>
        </template>
    </v-card>
</template>

<script>
    import {eventBus} from "../main";
    import axios from "axios";

    export default {
        name: "RightFilter",
        data: () => {
            return {
                enabled: false,

                menu: false,

                selectedTypes: [],
                selectedOrganization: null,
                select: null,

                schedule: null,
                organizations: [],
                filterSearchLoadingFlag: false,

                organizationLoaderFlag: false,
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

                console.log('PARAMS: ',params);
                if(headers["x-auth"]){
                    console.log("USER IS AUTHORIZED");
                }else{
                    console.log("USER IS NOT AUTHORIZED");
                }

                this.organizationLoaderFlag = true;
                axios.get('/api/orgs',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res) => {
                        console.log('RESPONSE: ', res);
                        this.$store.commit('setOrganizations', res.data.orgNames);
                        this.organizations = this.$store.getters.getOrganizations;
                    }).catch(e => {
                    console.log('ERROR: ',e.response);
                }).finally(() => {
                    console.log('FINISH');
                    this.organizationLoaderFlag = false;
                });
            }
        },
        methods: {
            resetFilter() {
                this.selectedTypes = [];
                this.selectedOrganization = null;
                this.schedule = null;
                this.commitFiltersToStore();
            },

            commitFiltersToStore() {
                let filters = {
                    typeOfRelief: this.selectedTypes,
                    schedule: this.schedule,
                    orgName: this.selectedOrganization
                };
                this.$store.commit('setFilters', filters);
            },

            filterSearch() {
                this.commitFiltersToStore();
                this.enabled = false;
                eventBus.$emit('reloadMap');
            }
        }
    }
</script>

<style scoped>

</style>