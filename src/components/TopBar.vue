<template>
    <v-app-bar
            app
            clipped-left
            color="primary"
            dark
            elevation="5"
    >

        <v-app-bar-nav-icon v-if="$isMobile()" @click="toggleDrawer"/>


        <v-img @click="goHome" :src="require('../assets/Logo-White.png')" max-width="30" max-height="30" class="mr-2"></v-img>

        <v-toolbar-title @click="goHome" class="align-center" v-if="!$isMobile() || !$route.path.startsWith('/search')">
            <span class="title">ত্রাণচিত্র</span>
        </v-toolbar-title>


        <v-spacer/>

        <template v-if="!$isMobile()">
            <v-toolbar-items v-for="(item,index) in items" :key="index">
                <v-btn text small :to="item.to">{{item.text}}</v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-if="$store.getters.getLoggedIn">
                <v-btn text small to="/logout">Sign Out</v-btn>
            </v-toolbar-items>
            <template v-else>
                <v-toolbar-items>
                    <v-btn text small to="/login">Sign In</v-btn>
                </v-toolbar-items>
                <v-toolbar-items>
                    <v-btn text small to="/reg">Register</v-btn>
                </v-toolbar-items>
            </template>
        </template>


        <!--        Search Bar to search Location-->
        <template v-if="$route.path.startsWith('/search')">

            <!--            If the PC is a Mobile-->
            <template v-if="$isMobile()">
                <v-row align="center" style="max-width: 650px" class="mr-1 ml-2">
                    <v-text-field
                            :append-icon-cb="() => {}"
                            label="Search"
                            flat
                            single-line
                            solo-inverted
                            hide-details
                            v-model="searchAddress"
                            v-on:keyup.enter="searchClicked"
                    />
                </v-row>

                <v-btn large class="primary darken-2 mr-1 ml-1" dark icon @click="searchClicked"
                       :loading="searchLoaderFlag">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </template>

            <!--            If the device is a PC-->
            <v-toolbar
                    v-else
                    light
                    dense
                    floating
                    style="position: fixed; top: 10vh; left: 40%; width: 20%"
            >
                <v-text-field
                        hide-details
                        prepend-icon="mdi-search"
                        single-line
                        v-model="searchAddress"
                        placeholder="Search..."
                        v-on:keyup.enter="searchClicked"
                ></v-text-field>
                <v-btn icon @click="searchClicked" :loading="searchLoaderFlag">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-toolbar>
        </template>
    </v-app-bar>
</template>

<script>
    import {eventBus} from "../main";

    export default {
        name: "TopBar",

        data: () => {
            return {
                searchAddress: null,
                searchLoaderFlag: false,
                //maps: null,

                apiKey: process.env.VUE_APP_API_KEY,

                items: [
                    {icon: 'mdi-home', text: 'Home', to: '/'},
                    {icon: 'mdi-magnify', text: 'Search Relief', to: '/search'},
                    {icon: 'mdi-plus', text: 'Add Relief', to: '/add'},
                    {icon: 'mdi-contacts', text: 'Organizations', to: '/orgs'},
                    //{icon: 'mdi-pencil', text: 'Register', to: '/reg'},
                    {icon: 'mdi-information', text: 'About us', to: '/about'},
                    {icon: 'mdi-help-circle', text: 'Help', to: '/howto'}
                ],
            }
        },
        components: {},
        async mounted() {
            await this.$store.dispatch('setupMaps');

            if(localStorage.getItem('x-auth')){
                this.$store.commit('login');
            }
        },
        methods: {
            goHome(){
              if(this.$route.path!=='/'){
                  this.$router.push('/');
              }
            },
            toggleDrawer() {
                eventBus.$emit('toggleDrawer');
            },
            searchClicked() {
                if (this.$route.name !== 'Search') {
                    this.$router.push({name: 'Search'});
                }
                console.log("Search clicked. Search address: ", this.searchAddress);

                if (this.searchAddress === null) {
                    console.log("Search address is null");
                    return;
                }

                this.searchLoaderFlag = true;
                let newSearchAddress = this.searchAddress + ', Bangladesh';
                this.callMapjsAPI(newSearchAddress);

            },

            callMapjsAPI(newSearchAddress) {
                let self = this;
                console.log("%cCALLING MAPSJAVASCRIPT API",'color:#1799B5');

                let geocoder = new this.$store.getters.getMaps.Geocoder();
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
                        eventBus.$emit('resetAndShow', data);

                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });

            }
        }
    }
</script>

<style scoped>

</style>