<template>
    <div>
        <v-list-item-title class="text-center">Organization: {{activity.orgName}}</v-list-item-title>
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td>Location:</td>
                        <td>149, Abed Dhali Road, Lake Circus, Kalabagan, Dhaka - 1205</td>
                    </tr>
                    <tr>
                        <td>Relief Type:</td>
                        <td>{{activity.typeOfRelief}}</td>
                    </tr>
                    <tr>
                        <td>Location:</td>
                        <td>{{activity.location}}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>

        <div class="text-center pb-2">
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
                {{activity.content}}{{'A relief labaid hospital'}}


<!--                <v-simple-table>-->

<!--                    <thead>-->
<!--                    <tr>-->
<!--                        <th class="text-left">Item</th>-->
<!--                        <th class="text-left">Quantity</th>-->
<!--                        <th class="text-left">Description</th>-->
<!--                    </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                    <tr v-for="(relief,index) in reliefs" :key="index">-->
<!--                        <td>{{ relief.item }}</td>-->
<!--                        <td>{{ relief.quantity }}</td>-->
<!--                        <td>{{ relief.description }}</td>-->
<!--                    </tr>-->
<!--                    </tbody>-->
<!--                </v-simple-table>-->
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

                date:null,
            }
        },
        mounted(){
            console.log('Activity loaded in SelectedActivity component, ',this.activity);
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