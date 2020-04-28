<template>
    <div class="text-center">
        <v-bottom-sheet v-model="sheet" inset hide-overlay>
            <v-card style="height: fit-content" shaped>
                <v-card v-if="bottomPopupLoadingFlag"
                        class="mx-auto"
                        outlined
                >
                    <div class="text-center ma-5">
                        <v-progress-circular
                                :size="70"
                                :width="7"developer
                                color="light-blue"
                                indeterminate
                        ></v-progress-circular>
                    </div>
                </v-card>

                <v-card v-else
                        class="mx-auto"
                        outlined
                >
                    <div class="text-right">
                        <v-btn
                                class="ma-2"
                                text
                                color="error"
                                @click="closeClicked"
                        >close
                        </v-btn>
                    </div>

                    <v-card-text v-if="!activitySelectedFlag">
                        <v-card-text class="text-center">
                            <b>List of Relief Activities in this Location</b>
                            <p>(click on any for details)</p>
                        </v-card-text>

                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <th>Acitivities</th>
                                    <th>Type of Relief</th>
                                </tr>
                                <tr v-for="(activity,index) in activities" :key="index" @click="selectActivity(index)">
                                    <td>Activity {{index}}</td>
                                    <td><span v-for="(type,index) in activity.typeOfRelief" :key="index">{{type}}, </span></td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>

                    <template v-else>
                        <v-btn icon class="light-blue lighten-4 ml-5" @click="backButtonClicked"><</v-btn>
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
                this.activitySelectedFlag=false;
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

                console.log('PARAMS: ', params);

                if(headers["x-auth"]){
                    console.log("USER IS AUTHORIZED");
                }else{
                    console.log("USER IS NOT AUTHORIZED");
                }

                this.bottomPopupLoadingFlag = true;
                axios.get('/api/activities',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res) => {
                        console.log('RESPONSE: ',res);
                        this.activities=res.data.activities;
                    }).catch(e => {
                        console.log('ERROR: ',e.response);
                    //console.log('error');
                }).finally(() => {
                    console.log('FINISH');
                    this.bottomPopupLoadingFlag = false;
                });
                this.activities = [
                    {orgName: 'Biddhanondo', typeOfRelief: 'Food', location: {lat: 23.5, lng: 90.1}},
                    {orgName: 'Badhan', typeOfRelief: 'PPE', location: {lat: 25, lng: 29}},
                    {orgName: 'WHO', typeOfRelief: 'Sanitizer', location: {lat: 30, lng: 29}}
                ];

            },

            closeClicked() {
                this.sheet = !this.sheet;
            },
        },

    }
</script>

<style scoped>

</style>