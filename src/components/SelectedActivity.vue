<template>
    <div>
        <v-list-item-title class="text-center">Organization: {{activity.orgName}}</v-list-item-title>
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td>Location:</td>
                        <td>{{formattedAddress}}</td>
                    </tr>
                    <tr>
                        <td>Relief Type:</td>
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
            <v-btn rounded class="yellow darken-1" small light @click="seeMoreClicked"
                   :loading="seeMoreLoadingFlag">
                <template v-if="!seeMoreFlag">
                    See More
                </template>
                <template v-else>
                    See Less
                </template>
            </v-btn>
        </div>

        <v-card class="ma-2" v-if="seeMoreFlag">
            <v-card-text class="title">Supplied: </v-card-text>
            <v-card-text class="subtitle-2">
                {{date}}
            </v-card-text>
            <v-card-text class="title">Description: </v-card-text>
            <v-card-text class="subtitle-2"
            >
                {{activity.contents}}
            </v-card-text>
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
                date:null,
            }
        },
        mounted(){
            console.log('selected activity: ',this.activity);
            let lat = this.activity.location.coordinates[1];
            let lng = this.activity.location.coordinates[0];

            console.log('CALLING GEOCODE API');

            let apiKey = process.env.VUE_APP_API_KEY;

            axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+apiKey)
            .then(response=>{
                console.log('RESPONSE: ',response);
                //console.log('Received formatted address: ',response.data.results[0].formatted_address);
                this.formattedAddress = response.data.results[0].formatted_address;
            })
            .catch(error=> {
                console.log("ERROR: ",error.response);
            })
            .finally(()=>{
                console.log('FINISH');
            })
        },
        methods: {
            seeMoreClicked() {
                if (this.seeMoreFlag) {
                    this.seeMoreFlag = false;
                } else {
                    this.seeMoreFlag = false;
                    this.date=new Date(this.activity.supplyDate).toDateString();
                    this.seeMoreFlag = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>