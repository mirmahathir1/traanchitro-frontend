<template>
    <v-card class="mx-auto elevation-12" max-width="800">
        <v-toolbar
                dark
                flat
                class="primary darken-1"
        >
            <v-toolbar-title>Add Relief</v-toolbar-title>
            <v-spacer/>
        </v-toolbar>


        <v-list class="ma-5" v-if="!saveCompleteFlag">
            <v-list-item>
                <v-row no-gutters>
                    <v-col
                            cols="12"
                            sm="12"
                            lg="3"
                    >
                        Pick type of relief:
                    </v-col>
                    <v-col
                            cols="12"
                            sm="12"
                            lg="9"
                    >
                        <v-checkbox v-model="selectedTypes" dense label="Food" value="FOOD"></v-checkbox>
                        <v-checkbox v-model="selectedTypes" dense label="PPE" value="PPE"></v-checkbox>
                        <v-checkbox v-model="selectedTypes" dense label="Sanitizer" value="SANITIZER"></v-checkbox>
                    </v-col>
                </v-row>
            </v-list-item>
            <v-list-item>
                <v-row no-gutters>
                    <v-col
                            cols="12"
                            sm="12"
                            lg="3"
                    >
                        Search location and drop pin:
                        <v-text-field
                                color="primary lighten-1"
                                label="Type location: "
                                name="location"
                                type="text"
                                class="mr-2"
                                v-model="searchedLocation"
                        />
                        <v-btn class="primary lighten-1 mb-5" @click="searchClicked" :loading="searchLoaderFlag">
                            Search
                        </v-btn>
                    </v-col>
                    <v-col
                            cols="12"
                            sm="12"
                            lg="9"
                    >
                        <LocationSelector class="mb-4" :setLocation="setLocation"></LocationSelector>
                    </v-col>
                </v-row>
            </v-list-item>

            <v-list-item>
                <v-row no-gutters>
                    <v-col
                            cols="12"
                            sm="12"
                            lg="3"
                    >
                        Pick Date:
                    </v-col>
                    <v-col
                            cols="12"
                            sm="12"
                            lg="9"
                    >
                        <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        v-model="date"
                                        label="Pick a date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker color="primary" v-model="date">
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="()=>{menu2=false;date=null;}">Reset</v-btn>
                                <v-btn text color="primary" @click="menu2 = false">Done</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-list-item>


            <v-list-item>
                <v-row no-gutters>
                    <v-col
                            cols="12"
                            sm="12"
                            lg="3"
                    >
                        Add relief Description:
                    </v-col>
                    <v-col
                            cols="12"
                            sm="12"
                            lg="9"
                    >
                        <v-textarea
                                outlined
                                color="primary"
                                label="Brief Description of Relief"
                                name="description"
                                type="text"
                                v-model="content"
                        />
                        <!--                        <v-row no-gutters>-->
                        <!--                            <v-col-->
                        <!--                                    sm="3"-->
                        <!--                            >-->
                        <!--                                <v-text-field-->
                        <!--                                        color="green"-->
                        <!--                                        label="Item"-->
                        <!--                                        name="item"-->
                        <!--                                        type="text"-->
                        <!--                                        v-model="inputEntry.item"-->
                        <!--                                />-->
                        <!--                            </v-col>-->
                        <!--                            <v-col-->
                        <!--                                    sm="3"-->
                        <!--                            >-->
                        <!--                                <v-text-field-->
                        <!--                                        color="primary"-->
                        <!--                                        label="Quantity"-->
                        <!--                                        name="quantity"-->
                        <!--                                        type="text"-->
                        <!--                                        v-model="inputEntry.quantity"-->
                        <!--                                />-->
                        <!--                            </v-col>-->
                        <!--                            <v-col-->
                        <!--                                    sm="3"-->
                        <!--                            >-->
                        <!--                                <v-text-field color="primary"-->
                        <!--                                        label="Description"-->
                        <!--                                        name="description"-->
                        <!--                                        type="text"-->
                        <!--                                        v-model="inputEntry.description"-->
                        <!--                                />-->
                        <!--                            </v-col>-->
                        <!--                            <v-col sm="3">-->
                        <!--                                <v-btn class="primary lighten-1 ml-4" fab dark x-small color="primary">-->
                        <!--                                    <v-icon dark @click="addToList">mdi-plus</v-icon>-->
                        <!--                                </v-btn>-->
                        <!--                            </v-col>-->
                        <!--                        </v-row>-->

                        <!--                        <v-alert v-for="(entry,index) in list"-->
                        <!--                                 :key="index"-->
                        <!--                                 close-text="Close Alert"-->
                        <!--                                 class="blue lighten-5"-->
                        <!--                        >-->
                        <!--                            {{entry.item}} / {{entry.quantity}} / {{entry.description}}-->
                        <!--                            <v-btn class="mx-2" fab dark x-small color="primary">-->
                        <!--                                <v-icon dark @click="removeFromList(index)">mdi-minus</v-icon>-->
                        <!--                            </v-btn>-->
                        <!--                        </v-alert>-->
                    </v-col>
                </v-row>
            </v-list-item>
            <v-list-item>
                <v-spacer></v-spacer>
                <v-card-actions>
                    <v-btn class="red lighten-1" dark to="/search">Cancel</v-btn>
                    <v-btn class="primary lighten-1" @click="saveClicked" :loading="saveLoaderFlag">Save</v-btn>
                </v-card-actions>
            </v-list-item>
        </v-list>

        <div class="ma-2" max-width="500" v-else>
            <v-card-text>
                Thank you for adding reliefs.
            </v-card-text>
            <v-card-actions>

                <v-btn class="primary lighten-2" block to="/">Go to maps</v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
    import LocationSelector from "../components/LocationSelector";
    import axios from "axios";
    import {eventBus} from "../main";

    export default {
        name: "Add",
        data: () => {
            return {
                //loader flags
                saveLoaderFlag: false,
                saveCompleteFlag: false,
                searchLoaderFlag: false,

                //types
                items: ['Food', 'Sanitizer', 'PPE'],
                selectedTypes: [],

                //location search textbox
                searchedLocation: null,

                //Calender
                date: null,
                menu2: false,

                //current center
                location: {},

                //content text box
                content: null,

                // list: [],
                // inputEntry: {
                //     item: 'Rice',
                //     quantity: 2,
                //     description: 'Chikon chal'
                // }
                // date: new Date().toISOString().substr(0, 10),

            }
        },
        components: {
            LocationSelector
        },
        methods: {
            setLocation(location) {
                //console.log('Set location called in Add.vue: ');

                this.location = {
                    lat: location.lat(),
                    lng: location.lng(),
                };

                console.log('New Center set at Add.vue: ', this.location);
            },

            searchClicked() {
                console.log("Search clicked");
                console.log('Name of location: ', this.searchedLocation);
                this.searchLoaderFlag = true;

                let newSearchAddress = this.searchedLocation + ', Bangladesh';
                let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + newSearchAddress + '&key=AIzaSyBdudQyn0ECon1ggxM-i3t4xhbQTVYAgLA';
                let processedURL = url.replace(/ /g, '%20');
                console.log('Send data: ', processedURL);
                axios.get(processedURL)
                    .then(res => {
                        console.log("The Full search result is ", res.data.results[0]);
                        console.log(res.data.results[0].geometry.location);
                        let data = {
                            focusLocation: res.data.results[0].geometry.location,
                            locations: [],
                            bounds: res.data.results[0].geometry.bounds,
                        };
                        eventBus.$emit('searchClicked', data);
                    })
                    .finally(() => {
                        this.searchLoaderFlag = false;
                    });
            },

            saveClicked() {
                console.log('Save button clicked');
                console.log('Received location from LocationSelector: ', this.location);
                console.log('Types of relief selected: ', this.selectedTypes);
                console.log('Selected date: ', this.date);
                //console.log('list of items', this.list);
                console.log('Content: ', this.content);

                let data = {
                    typeOfRelief: ["FOOD"],
                    location: {
                        lat: 23,
                        lng: 29
                    },
                    contents: "Hello",
                    supplyDate: '2020-04-07'

                };
                let headers = {
                    'x-auth': this.$store.getters.getToken
                };

                console.log('Data: ',data);
                console.log('Headers: ',headers);

                this.saveLoaderFlag = true;
                axios.post('/api/activity', data, {
                    headers: headers
                })
                    .then((res) => {
                        console.log(res.data);
                        this.saveLoaderFlag = true;
                    }).catch(e => {
                    console.log('error: ', e.response);
                }).finally(() => {
                    console.log('finished');
                    this.saveLoaderFlag = false;
                });




            },
            // addToList() {
            //     this.list.push(this.inputEntry);
            //     this.inputEntry = {
            //         item: null,
            //         quantity: null,
            //         description: null
            //     }
            // },
            // removeFromList(index) {
            //     console.log('remove from list clicked');
            //     this.list.splice(index, 1);
            // }
        }
    }
</script>

<style scoped>

</style>