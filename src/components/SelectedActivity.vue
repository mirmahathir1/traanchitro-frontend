<template>
    <div class="teal--text text--accent-1">
        <v-list-item-title class="text-center white--text">
            Organization: <b>{{activity.orgName}}</b>
            <br>
            <v-btn rounded class="white" x-small @click="goToOrganization">Go To Organization</v-btn>
        </v-list-item-title>
        <v-card-text>
            <v-simple-table class="primary darken-3 white--text" dark>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="teal--text text--accent-1">Location:</td>
                        <td class="white--text">
                            <template v-if="formattedAddress===null">
                                <v-progress-circular
                                    indeterminate
                                    color="primary"
                                ></v-progress-circular>
                            </template>
                            <template v-else>
                                {{formattedAddress}}
                            </template>

                        </td>
                    </tr>
                    <tr>
                        <td class="teal--text text--accent-1">Relief Type:</td>
                        <td class="white--text">
                            <span v-for="(type,index) in activity.typeOfRelief" :key="index">
                                {{type}}<span v-if="index!==activity.typeOfRelief.length-1">,</span>
                            </span>
                        </td>
                    </tr>
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

        <v-card class="ma-2 pa-4" v-if="seeMoreFlag" style="overflow-y: scroll; height: 200px" color="primary darken-3">

            <p class="title teal--text text--accent-1">Date of Supply:</p>
            <p class="subtitle-2 white--text" v-if="activity.supplyDate">
                {{new Date(activity.supplyDate).toDateString()}}
            </p>
            <template v-if="activity.contents.length!==0">
                    <p class="title teal--text text--accent-1">Description:</p>
                    <p class="subtitle-2 white--text"
                    >
                        {{activity.contents[0].item}}
                    </p>
            </template>

        </v-card>
    </div>
</template>

<script>

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
            //console.log('selected activity: ', this.activity);

            let interval = setInterval(() => {
                if (this.$store.getters.getMaps) {
                    this.maps = this.$store.getters.getMaps;

                    clearInterval(interval);
                    //this.callGeoCodeAPI();
                    this.callMapjsAPI();


                }
            }, 1000);


        },
        methods: {
            goToOrganization(){
                //console.log("Go to organization clicked");
              this.$router.push({name: "Organizations", params:{orgName: this.activity.orgName}})
            },

            callMapjsAPI() {
                console.log("%cCALLING MAPSJAVASCRIPT API",'color:#1799B5');
                let geocoder = new this.maps.Geocoder();
                var latlng = {
                    lat: this.activity.location.lat,
                    lng: this.activity.location.lng
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
            // callGeoCodeAPI() {
            //     let lat = this.activity.location.coordinates[1];
            //     let lng = this.activity.location.coordinates[0];
            //
            //     console.log('CALLING GEOCODE API');
            //
            //     let apiKey = process.env.VUE_APP_API_KEY;
            //
            //     axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + apiKey)
            //         .then(response => {
            //             console.log('RESPONSE: ', response);
            //             //console.log('Received formatted address: ',response.data.results[0].formatted_address);
            //             this.formattedAddress = response.data.results[0].formatted_address;
            //         })
            //         .catch(error => {
            //             console.log("ERROR: ", error.response);
            //         })
            //         .finally(() => {
            //             console.log('FINISH');
            //         })
            // },

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