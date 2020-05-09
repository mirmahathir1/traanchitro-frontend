<template>
    <div class="text-center">
        <v-bottom-sheet v-model="sheet" inset hide-overlay class="primary">
            <v-card style="height: fit-content" color="primary darken-1" >
                <v-card v-if="bottomPopupLoadingFlag"
                        class="mx-auto"
                        outlined
                        color="primary darken-1"
                >
                    <div class="text-center ma-5">
                        <v-progress-circular
                                :size="70"
                                :width="7" developer
                                color="black"
                                indeterminate
                        ></v-progress-circular>
                    </div>
                </v-card>

                <v-card v-else
                        class="mx-auto"
                        outlined
                        color="primary darken-1"
                >
                    <div class="text-right">
                        <v-btn
                                class="ma-2"
                                text
                                color="white"

                                @click="closeClicked"
                        >close
                        </v-btn>
                    </div>

                    <v-card-text v-if="!activitySelectedFlag" class="white--text">
<!--                        88f9d4-->
                        <v-card-text class="text-center">
                            <b>{{activities.length}} Relief Activities in this Location</b>
                            <p>(click on any activity for details)</p>
                        </v-card-text>

                        <v-simple-table class="primary darken-3 white--text" dark style="overflow-y: scroll; height: 150px">
                                <tbody>
                                <tr class="primary darken-2">
                                    <th>Acitivities</th>
                                    <th>Type of Relief</th>
                                </tr>
                                <tr v-for="(activity,index) in activities" :key="index" @click="selectActivity(index)">
                                    <td>Activity {{index+1}}</td>
                                    <td>
                                        <span v-for="(type,index) in activity.typeOfRelief" :key="index">
                                            {{type}}<span v-if="index!==activity.typeOfRelief.length-1">,</span>
                                        </span>
                                    </td>
                                </tr>
                                </tbody>

                        </v-simple-table>
                    </v-card-text>

                    <template v-else>
                        <!--                        <v-btn icon class="light-blue lighten-4 ml-5" @click="backButtonClicked"><</v-btn>-->
                        <v-card-text>
                            <v-btn icon class="teal accent-1" @click="backButtonClicked">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                        </v-card-text>
                        <SelectedActivity :activity="selectedActivity"></SelectedActivity>
                    </template>
                </v-card>
            </v-card>
        </v-bottom-sheet>
    </div>
</template>

<script>
    import SelectedActivity from "./SelectedActivity";
    import axios from "axios";

    export default {
        name: "BottomPopup",
        components: {
            SelectedActivity
        },
        data() {
            return {
                sheet: true,
                seeMoreFlag: false,
                seeMoreLoadingFlag: false,
                bottomPopupLoadingFlag: true,

                activitySelectedFlag: false,

                lat: "null",
                lng: "null",

                activities: [],

                selectedActivity: null,

                reliefs: [],
            }
        },
        watch: {
            'sheet'(to, from) {
                setTimeout(() => {
                    this.$router.push('/search');
                }, 200);
            },
            '$route'(to, from) {
                this.openBottomDrawer(to.params.position);
            }

        },
        mounted() {
            this.openBottomDrawer(this.$route.params.position);
        },
        methods: {
            backButtonClicked() {
                this.activitySelectedFlag = false;
            },

            selectActivity(index) {
                this.selectedActivity = this.activities[index];
                this.activitySelectedFlag = true;
            },

            openBottomDrawer(positionString) {
                this.activitySelectedFlag = false;

                let position;
                try {
                    position = JSON.parse(positionString);
                } catch (e) {
                    console.log('Invalid co-ordinates');
                    this.$router.push({name: 'NotFound'});
                    return;
                }

                //console.log(position);
                //console.log("BottomPopup mounted");


                this.bottomPopupLoadingFlag = true;

                let params = {
                    filter: this.$store.getters.getFilters,
                    location: {
                        lat: position.lat,
                        lng: position.lng
                    }
                };
                let headers = {
                    'x-auth': localStorage.getItem('x-auth'),
                };
                let url = '/api/activities';

                this.$apiRequestLog(url,params,headers);

                axios.get(url,
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res) => {
                        console.log('RESPONSE: ', res);
                        this.activities = res.data.activities;
                    }).catch(e => {
                        this.$errorMessage(e);
                    //console.log('ERROR: ', e.response);

                }).finally(() => {
                    console.log('FINISH');
                    this.bottomPopupLoadingFlag = false;
                });
            },

            closeClicked() {
                this.sheet = !this.sheet;
            },
        },

    }
</script>

<style scoped>

</style>