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
            <v-toolbar-items v-else>
                <v-btn text small to="/login">Sign In</v-btn>
            </v-toolbar-items>
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
    import GoogleMapsApiLoader from "google-maps-api-loader";

    export default {
        name: "TopBar",
        data: () => {
            return {
                searchAddress: null,
                searchLoaderFlag: false,
                maps: null,

                apiKey: process.env.VUE_APP_API_KEY,

                items: [
                    {icon: 'mdi-home', text: 'Home', to: '/'},
                    {icon: 'mdi-magnify', text: 'Search Relief', to: '/search'},
                    {icon: 'mdi-plus', text: 'Add Relief', to: '/add'},
                    {icon: 'mdi-contacts', text: 'Organizations', to: '/orgs'},
                    {icon: 'mdi-pencil', text: 'Register', to: '/reg'},
                    {icon: 'mdi-information', text: 'About us', to: '/about'},
                    {icon: 'mdi-help-circle', text: 'Help', to: '/howto'}
                ],
            }
        },
        components: {},
        async mounted() {
            const googleMapApi = await GoogleMapsApiLoader({
                apiKey: this.apiKey
            });
            this.$store.commit('setMaps',googleMapApi.maps);
            console.log("%cGOOGLE MAP API INCLUDED: ",'color:#1799B5');
            this.maps=this.$store.getters.getMaps;

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
            // isMobile() {
            //     let check = false;
            //     (function (a) {
            //         if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            //     })(navigator.userAgent || navigator.vendor || window.opera);
            //     return check;
            // },
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
                //this.callGeoCodeAPI(newSearchAddress);
            },

            // callGeoCodeAPI(newSearchAddress) {
            //     let apiKey = process.env.VUE_APP_API_KEY;
            //
            //     let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + newSearchAddress + '&key=' + apiKey;
            //
            //     let processedURL = url.replace(/ /g, '%20');
            //
            //     console.log('CALLING GEOCODE API');
            //     axios.get(processedURL)
            //         .then(res => {
            //             console.log("RESPONSE: ", res);
            //             // console.log("The Full search result is ",res.data.results[0]);
            //             // console.log(res.data.results[0].geometry.location);
            //
            //             let data = {
            //                 focusLocation: res.data.results[0].geometry.location,
            //                 bounds: res.data.results[0].geometry.bounds,
            //             };
            //             console.log("Data emitted to map: ", data);
            //             eventBus.$emit('resetAndShow', data);
            //
            //         })
            //         .catch((error) => {
            //             console.log("ERROR: ", error.response);
            //         })
            //         .finally(() => {
            //             console.log("FINISH");
            //             this.searchLoaderFlag = false;
            //         });
            // },
            callMapjsAPI(newSearchAddress) {
                let self = this;
                console.log("%cCALLING MAPSJAVASCRIPT API",'color:#1799B5');

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