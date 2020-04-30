<template>
    <div class="teal--text text--accent-1">
        <v-list-item-title class="text-center white--text">Organization: {{activity.orgName}}</v-list-item-title>
        <v-card-text>
            <v-simple-table class="black teal--text text--accent-1" dark>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="white--text">Location:</td>
                        <td>{{formattedAddress}}</td>
                    </tr>
                    <tr>
                        <td class="white--text">Relief Type:</td>
                        <td><span v-for="(type,index) in activity.typeOfRelief" :key="index">{{type}}, </span></td>
                    </tr>
                    <!--                    <tr>-->
                    <!--                        <td>Location:</td>-->
                    <!--                        <td>{{activity.location}}</td>-->
                    <!--                    </tr>-->
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>

        <div class="text-center pb-2" v-if="activity.supplyDate">
            <v-btn rounded class="white" small light @click="seeMoreClicked"
                   :loading="seeMoreLoadingFlag">
                <template v-if="!seeMoreFlag">
                    See More
                </template>
                <template v-else>
                    See Less
                </template>
            </v-btn>
        </div>

        <v-card class="ma-2" v-if="seeMoreFlag" style="overflow-y: scroll; height: 200px" color="black">

            <v-card-text class="title white--text">Supplied:</v-card-text>
            <v-card-text class="subtitle-2 teal--text text--accent-1" v-if="activity.supplyDate">
                {{new Date(activity.supplyDate).toDateString()}}
            </v-card-text>
            <template v-if="activity.contents">
                    <v-card-text class="title white--text">Description:</v-card-text>
                    <v-card-text class="subtitle-2 teal--text text--accent-1"
                    >
                        {{activity.contents}}
                    </v-card-text>
            </template>

        </v-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "SelectedActivity",
        props: ['activity'],
        data: () => {
            return {
                seeMoreFlag: false,
                seeMoreLoadingFlag: false,
                reliefs: [],
                formattedAddress: null,
                date: null,

                maps: null,
            }
        },
        async mounted() {
            console.log('selected activity: ', this.activity);

            let interval = setInterval(() => {
                if (this.$store.getters.getMaps) {
                    this.maps = this.$store.getters.getMaps;

                    //this.callGeoCodeAPI();
                    this.callMapjsAPI();

                    clearInterval(interval);
                }
            }, 100);


        },
        methods: {
            callMapjsAPI() {
                console.log("CALLING MAPSJAVASCRIPT API");
                let geocoder = new this.maps.Geocoder();
                var latlng = {
                    lat: this.activity.location.coordinates[1],
                    lng: this.activity.location.coordinates[0]
                };

                let self = this;
                geocoder.geocode({'location': latlng}, function (results, status) {
                    console.log("STATUS: ", status);
                    console.log("RESPONSE: ", results);
                    if (status === 'OK') {
                        if (results[0]) {
                            self.formattedAddress = results[0].formatted_address;
                        } else {
                            console.log('ERROR: No results found');
                        }
                    } else {
                        console.log('ERROR: ' + status);
                    }
                });


            },
            callGeoCodeAPI() {
                let lat = this.activity.location.coordinates[1];
                let lng = this.activity.location.coordinates[0];

                console.log('CALLING GEOCODE API');

                let apiKey = process.env.VUE_APP_API_KEY;

                axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + apiKey)
                    .then(response => {
                        console.log('RESPONSE: ', response);
                        //console.log('Received formatted address: ',response.data.results[0].formatted_address);
                        this.formattedAddress = response.data.results[0].formatted_address;
                    })
                    .catch(error => {
                        console.log("ERROR: ", error.response);
                    })
                    .finally(() => {
                        console.log('FINISH');
                    })
            },

            seeMoreClicked() {
                if (this.seeMoreFlag) {
                    this.seeMoreFlag = false;
                } else {
                    this.seeMoreFlag = false;
                    this.date = new Date(this.activity.supplyDate).toDateString();
                    this.seeMoreFlag = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>