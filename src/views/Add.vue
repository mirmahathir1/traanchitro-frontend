<template>
    <v-card class="mx-auto elevation-12" max-width="800">
        <v-toolbar
                dark
                flat
                class="primary darken-2"
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
                        Pick type of relief (At least one):
                        <v-card-text v-if="selectedTypes.length===0" class="red--text">Select at least one</v-card-text>
                    </v-col>
                    <v-col
                            cols="12"
                            sm="12"
                            lg="9"
                    >
                        <v-checkbox v-model="selectedTypes" v-for="(type,index) in CONSTANTS.typeOfRelief" :key="index" hide-details dense :label="type.type" :value="type.value"></v-checkbox>
<!--                        <v-checkbox v-model="selectedTypes" hide-details dense label="Medical Supply" value="MEDICAL_SUPPLY"></v-checkbox>-->
<!--                        <v-checkbox v-model="selectedTypes" hide-details dense label="Disinfection" value="SANITIZER"></v-checkbox>-->
                    </v-col>
<!--                    <v-col-->
<!--                            cols="12"-->
<!--                            sm="6"-->
<!--                            lg="4"-->
<!--                    >-->
<!--                        <v-checkbox v-model="selectedTypes" hide-details dense label="Mask" value="MASK"></v-checkbox>-->
<!--                        <v-checkbox v-model="selectedTypes" hide-details dense label="Glove" value="GLOVE"></v-checkbox>-->
<!--                    </v-col>-->


                </v-row>
            </v-list-item>


            <v-list-item class="mt-2">
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
                                        @input="$v.date.$touch()"
                                        @blur="$v.date.$touch()"
                                        :error-messages="dateErrors"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    color="primary"
                                    v-model="date"
                            >
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
    import {required} from 'vuelidate/lib/validators';
    import {CONSTANTS} from '../constants';

    export default {
        name: "Add",
        validations: {
            date: {required},
        },
        computed: {
            dateErrors() {
                const errors = [];
                if (!this.$v.date.$dirty) return errors;
                !this.$v.date.required && errors.push('Date is required.');
                return errors
            },
        },

        data: () => {
            return {
                CONSTANTS,
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

                maps: null,
                apiKey: process.env.VUE_APP_API_KEY,

            }
        },
        components: {
            LocationSelector
        },

        beforeRouteEnter(to, from, next) {
            if (localStorage.getItem('x-auth')) {
                next();
            } else {
                next({name: 'Notice', params: {text: "You must be signed in to add reliefs"}});
            }
        },

        async mounted() {
            let interval= setInterval(()=>{
                if(this.$store.getters.getMaps){
                    this.maps = this.$store.getters.getMaps;

                    clearInterval(interval);
                }
            },100);
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
                console.log('Name of location: ', this.searchedLocation);

                let newSearchAddress = this.searchedLocation + ', Bangladesh';

                //this.callGeoCodeAPI(newSearchAddress);
                this.callMapjsAPI(newSearchAddress);
            },
            callMapjsAPI(newSearchAddress) {
                let self = this;
                console.log("CALLING MAPSJAVASCRIPT API");
                this.searchLoaderFlag = true;
                let geocoder = new this.maps.Geocoder();

                geocoder.geocode({'address': newSearchAddress}, function (results, status) {
                    console.log("FINISH");
                    self.searchLoaderFlag = false;
                    if (status === 'OK') {
                        console.log("RESPONSE: ", results);
                        let bounds = undefined;
                        if (results[0].geometry.bounds) {
                            bounds = {
                                northeast: {
                                    lat: results[0].geometry.bounds.Ya.j,
                                    lng: results[0].geometry.bounds.Ua.j,
                                },
                                southwest: {
                                    lat: results[0].geometry.bounds.Ya.i,
                                    lng: results[0].geometry.bounds.Ua.i
                                }
                            }
                        }
                        let focusLocation = results[0].geometry.location;
                        let data = {
                            focusLocation: {
                                lat: focusLocation.lat(),
                                lng: focusLocation.lng(),
                            },
                            bounds: bounds
                        };
                        eventBus.$emit('searchClicked', data);

                    } else {
                        console.log('ERROR: ' + status);
                    }
                });

            },
            callGeoCodeAPI(newSearchAddress){
                let apiKey=process.env.VUE_APP_API_KEY;
                let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + newSearchAddress + '&key='+apiKey;
                let processedURL = url.replace(/ /g, '%20');
                console.log("CALLING GEOCODE API");
                this.searchLoaderFlag = true;
                axios.get(processedURL)
                    .then(res => {
                        console.log("RESPONSE: ", res);
                        let data = {
                            focusLocation: res.data.results[0].geometry.location,
                            bounds: res.data.results[0].geometry.bounds,
                        };
                        eventBus.$emit('searchClicked', data);
                    })
                    .catch((error) => {
                        console.log("ERROR: ", error.response);
                    })
                    .finally(() => {
                        console.log("FINISH");
                        this.searchLoaderFlag = false;
                    });
            },
            saveClicked() {
                let data = {
                    typeOfRelief: this.selectedTypes,
                    location: {
                        lat: this.location.lat,
                        lng: this.location.lng,
                    },
                    contents: this.content,
                    supplyDate: this.date
                };

                console.log('DATA: ', data);

                this.$v.$touch();

                if (this.selectedTypes.length === 0 || this.location.lat===undefined) {
                    return;
                }

                if (this.$v.$anyError) {
                    return;
                }



                let headers = {
                    'x-auth': localStorage.getItem('x-auth')
                };



                if (headers["x-auth"]) {
                    console.log("USER IS AUTHORIZED");
                } else {
                    console.log("USER IS NOT AUTHORIZED");
                }

                this.saveLoaderFlag = true;
                axios.post('/api/activity', data, {
                    headers: headers
                })
                    .then((res) => {
                        console.log("RESPONSE: ", res);
                        this.$router.push({name: 'Notice',params:{text:'Relief added successfully in database.'}});
                        this.saveLoaderFlag = true;
                    })
                    .catch(e => {
                        console.log('ERROR: ', e.response);
                    })
                    .finally(() => {
                        console.log('FINISH');
                        this.saveLoaderFlag = false;
                    });
            },

        }
    }
</script>

<style scoped>

</style>