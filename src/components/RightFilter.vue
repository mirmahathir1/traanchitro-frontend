<template>
    <v-card max-width="400" style="position: fixed; top:20vh; right:0px">
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
                        <v-checkbox v-model="selectedTypes" dense label="Food" value="FOOD"></v-checkbox>
                        <v-checkbox v-model="selectedTypes" dense label="PPE" value="PPE"></v-checkbox>
                        <v-checkbox v-model="selectedTypes" dense label="Sanitizer" value="SANITIZER"></v-checkbox>
                    </v-col>
                    <v-col
                            :cols="8"
                    >
                        <p>Filter by Organization:</p>
                        <!--                        <v-select-->
                        <!--                                :items="organizations"-->
                        <!--                                label="Select Organization"-->
                        <!--                                outlined-->
                        <!--                                v-model="selectedOrganization"-->
                        <!--                        ></v-select>-->
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
                    </v-col>
                </v-row>
            </v-container>

            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
<!--                <v-btn text @click="enabled = false">Cancel</v-btn>-->
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
          this.organizations=this.$store.getters.getOrganizations;
          //console.log('amount of organizations: ',this.$store.getters.getOrganizations)

            if(this.organizations.length===0) {
                let params = {};

                let headers = {
                    TOKEN: localStorage.getItem('x-auth'),
                };
                this.organizationLoaderFlag=true;
                axios.get('/api/orgs',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res)=>{
                        console.log('received organization names: ',res.data.orgNames);
                        this.$store.commit('setOrganizations',res.data.orgNames);
                        this.organizations=this.$store.getters.getOrganizations;
                    }).catch(e=>{
                    console.log('error');
                }).finally(()=>{
                    console.log('Organizations loaded finished');
                    this.organizationLoaderFlag=false;
                });
            }
        },
        methods: {
            filterSearch() {
                let filters = {
                    typeOfRelief: this.selectedTypes,
                    schedule: this.schedule,
                    orgName: this.selectedOrganization
                };

                this.$store.commit('setFilters', filters);
                //console.log("Filters from store: ", this.$store.getters.getFilters);
                this.enabled=false;

                eventBus.$emit('reloadMap');
                // this.filterSearchLoadingFlag = true;
                // setTimeout(() => {
                //
                //     this.menu = false;
                //     this.filterSearchLoadingFlag = false;
                // }, 2000);
            }
        }
    }
</script>

<style scoped>

</style>