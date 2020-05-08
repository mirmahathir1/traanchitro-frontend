<template>
    <v-card max-width="400" style="position: fixed; top:10vh; right:0px">
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
                            :cols="7"
                    >
                        <p>Filter by Organization:</p>
                        <v-autocomplete v-model="selectedOrganization"
                                        :items="organizations"
                                        :search-input.sync="select"
                                        :loading="organizationsLoader"
                                        :disabled="organizationsLoader"
                                        cache-items flat hide-no-data hide-details
                                        :label="organizationsLoader?'Loading Names of organizations...':'Name of organization:' "
                                        class="mb-3"></v-autocomplete>
                        <p class="red--text ml-5">{{organizationsError}}</p>

                        <template v-if="$store.getters.getLoggedIn">
                            <p>Schedule:</p>
                            <v-radio-group v-model="schedule">
                                <v-radio :label="'Past Delivery'" :value="'PAST'"></v-radio>
                                <v-radio :label="'Scheduled Delivery'" :value="'SCHEDULED'"></v-radio>
                            </v-radio-group>
                        </template>
                    </v-col>
                    <v-col
                            :cols="5"
                    >
                        <p>Type of Relief:</p>
                        <v-checkbox hide-details v-model="selectedTypes" dense
                                    v-for="(type,index) in CONSTANTS.typeOfRelief" :key="index" :label="type.type"
                                    :value="type.value"></v-checkbox>
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
    import {CONSTANTS} from '../constants';
    import {mapGetters} from 'vuex';
    export default {
        name: "RightFilter",
        computed:{
            ...mapGetters([
                'organizations',
                'organizationsLoader',
                'organizationsError',
            ]),
        },
        data: () => {
            return {
                CONSTANTS,

                enabled: false,

                menu: false,

                selectedTypes: [],
                selectedOrganization: null,
                select: null,

                schedule: null,
                filterSearchLoadingFlag: false,

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