<template>
    <div>
        <div class="google-map" ref="googleMap" id="map"></div>
        <template v-if="Boolean(this.map)">
            <slot
                    :map="map"
            />
        </template>

        <v-btn absolute dark fab bottom small right fixed color="primary darken-2" style="bottom: 10vh"
               @click="addButtonClicked()">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn absolute dark fab bottom small right fixed color="primary darken-2" style="bottom: 3vh"
               :loading="reloadLoaderFlag" @click="refreshClicked()">
            <v-icon>mdi-reload</v-icon>
        </v-btn>

        <v-snackbar v-model="snackbar" v-if="$store.getters.getSnackbar" vertical color="primary darken-2" left
                    style="width: 280px">
            {{ snackbarText }}
            <div>
                <v-btn color="white" text @click="stopSnackbar">Close</v-btn>
            </div>
        </v-snackbar>

        <RightFilter></RightFilter>


    </div>
</template>

<script>
    import {eventBus} from "../main";
    import axios from 'axios';
    import RightFilter from "./RightFilter";


    export default {
        components: {
            RightFilter,

        },
        data() {
            return {
                reloadLoaderFlag: false,

                sheet: false,
                snackbar: true,
                snackbarText: "Press reload button (bottom right) to show pins",

                map: null,
                maps: null,
                markers: [],

                mapConfig: {
                    center: {lat: 23.6850, lng: 90.3563},
                    zoom: 7,
                    options: {
                        gestureHandling: 'greedy'
                    },
                    disableDefaultUI: true,
                },

                currentPosition: null,
                apiKey: process.env.VUE_APP_API_KEY,

                //real time data loading maps
                mapDragDetected: false,
                mapBusy: false,


            };
        },

        async mounted() {
            let interval = setInterval(() => {
                if (this.$store.getters.getMaps) {
                    this.maps = this.$store.getters.getMaps;

                    this.initializeMap();
                    eventBus.$on('resetAndShow', (data) => {
                        this.mapListener(data);
                    });
                    eventBus.$on('reloadMap', () => {
                        this.refreshClicked();
                    });
                    clearInterval(interval);
                }
            }, 100);

            //setInterval(this.mapLiveReloadHandler, 1000);


            // const googleMapApi = await GoogleMapsApiLoader({
            //     apiKey: this.apiKey
            // });
            //
            // this.google = googleMapApi;
            //
            // this.initializeMap();
            //
            // eventBus.$on('resetAndShow', (data) => {
            //     this.mapListener(data);
            // });
            // eventBus.$on('reloadMap', () => {
            //     this.refreshClicked();
            // })
        },

        methods: {
            mapLiveReloadHandler() {
                if (this.mapDragDetected && !this.mapBusy) {
                    this.mapBusy = true;



                    let bounds = this.map.getBounds();

                    let params = {
                        bounds: {
                            northeast: {
                                lat: bounds.Ya.j,
                                lng: bounds.Ua.j,
                            },
                            southwest: {
                                lat: bounds.Ya.i,
                                lng: bounds.Ua.i
                            }
                        },
                        filter: this.$store.getters.getFilters
                    };
                    let headers = {
                        'x-auth': localStorage.getItem('x-auth'),
                    };
                    console.log('PARAMS: ', params);

                    if (headers["x-auth"]) {
                        console.log("USER IS AUTHORIZED");
                    } else {
                        console.log("USER IS NOT AUTHORIZED");
                    }

                    this.reloadLoaderFlag = true;
                    axios.get('/api/pins',
                        {
                            headers: headers,
                            params: params
                        })
                        .then((res) => {
                            console.log('RESPONSE: ', res);
                            this.addNewMarkers(res.data.locations);
                        }).catch(e => {
                        console.log('ERROR: ', e.response);
                    }).finally(() => {
                        console.log("FINISH");
                        this.reloadLoaderFlag = false;
                        this.mapBusy = false;
                        this.mapDragDetected = false;
                    });




                    // setTimeout(() => {
                    //     console.log("Map live reload initiate");
                    //     this.mapBusy = false;
                    //     this.mapDragDetected = false;
                    // }, 1000);
                }

            },


            addButtonClicked() {
                let bounds = this.map.getBounds();
                let newReliefLocation = {
                    focusLocation: {
                        lat: this.map.getCenter().lat(),
                        lng: this.map.getCenter().lng()
                    },
                    northeast: {
                        lat: bounds.Ya.j,
                        lng: bounds.Ua.j,
                    },
                    southwest: {
                        lat: bounds.Ya.i,
                        lng: bounds.Ua.i
                    }
                };
                this.$store.commit('setNewReliefLocation', newReliefLocation);
                this.$router.push({name: 'Add'});
            },

            stopSnackbar() {
                this.$store.commit('stopSnackbar');
                this.snackbar = false;
            },
            refreshClicked() {
                let bounds = this.map.getBounds();

                let params = {
                    bounds: {
                        northeast: {
                            lat: bounds.Ya.j,
                            lng: bounds.Ua.j,
                        },
                        southwest: {
                            lat: bounds.Ya.i,
                            lng: bounds.Ua.i
                        }
                    },
                    filter: this.$store.getters.getFilters
                };
                let headers = {
                    'x-auth': localStorage.getItem('x-auth'),
                };
                console.log('PARAMS: ', params);

                if (headers["x-auth"]) {
                    console.log("USER IS AUTHORIZED");
                } else {
                    console.log("USER IS NOT AUTHORIZED");
                }

                this.reloadLoaderFlag = true;
                axios.get('/api/pins',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res) => {
                        console.log('RESPONSE: ', res);
                        let data = {
                            locations: res.data.locations,
                        };
                        this.putMarkersOnBound(data);
                    }).catch(e => {
                    console.log('ERROR: ', e.response);
                }).finally(() => {
                    console.log("FINISH");
                    this.reloadLoaderFlag = false;
                });
            },

            putMarkersOnBound(data) {
                this.clearAllMarkers();
                this.addNewMarkers(data.locations);
            },

            mapListener(data) {
                this.map.setCenter(data.focusLocation);

                //fit the map according to the bound of the new area
                if (data.bounds != undefined) {
                    let northeastlatlng = new this.maps.LatLng(data.bounds.northeast.lat, data.bounds.northeast.lng);
                    let southwestlatlng = new this.maps.LatLng(data.bounds.southwest.lat, data.bounds.southwest.lng);
                    var bounds = new this.maps.LatLngBounds();
                    bounds.extend(northeastlatlng);
                    bounds.extend(southwestlatlng);
                    this.map.fitBounds(bounds);
                } else {
                    this.map.setZoom(17);
                }
                this.refreshClicked();
            },

            clearAllMarkers() {
                this.markers.forEach((marker) => {
                    marker.setMap(null);
                });
                this.markers = [];
            },

            addNewMarkers(locations) {
                let newLocations = [];

                locations.forEach((location) => {
                    let alreadyExists=false;

                    for(let i = 0 ; i < this.markers.length; i++){
                        if (this.markers[i].position.lat() === location.lat || this.markers[i].position.lng() === location.lng) {
                            alreadyExists=true;
                            break;
                        }
                    }

                    if(!alreadyExists){
                        newLocations.push(location);
                    }
                });

                console.log("new markers added to map: ", newLocations.length);

                newLocations.forEach((location) => {
                    //locations.forEach((location) => {
                    let marker = new this.maps.Marker({
                        position: {
                            lat: location.lat,
                            lng: location.lng
                        },
                        map: this.map,
                        animation: this.maps.Animation.DROP
                    });
                    this.markers.push(marker);
                    marker.addListener('click', this.seeMarkerDetails);
                    //console.log("New marker added: ",marker.position.lat(),marker.position.lng());
                });
            },

            seeMarkerDetails(position) {
                console.log("Selected marker: ", position.latLng.lat(), position.latLng.lng());
                let selectedLocation = {
                    lat: position.latLng.lat(),
                    lng: position.latLng.lng()
                };
                this.map.setCenter(selectedLocation);

                let newPath = '/search/details/' + JSON.stringify(selectedLocation);

                //console.log(encodeURI(newPath));

                if (this.$route.path !== newPath) {
                    this.$router.push(newPath);
                }


            },

            mapClicked(position) {
                let clickedPosition = {
                    lat: position.latLng.lat(),
                    lng: position.latLng.lng()
                };
                console.log(clickedPosition);
            },

            mapDragEnded() {
                console.log("Map dragend detected");
                this.mapDragDetected = true;
            },
            mapZoomChanged() {
                console.log("Map zoom detected");
                this.mapDragDetected = true;
            },

            initializeMap() {
                const mapContainer = this.$refs.googleMap;
                this.map = new this.maps.Map(mapContainer, this.mapConfig);
                //this.map.addListener('click', this.mapClicked);
                this.map.addListener('dragend', this.mapDragEnded);
                this.map.addListener('zoom_changed', this.mapZoomChanged);
            }
        }
    };
</script>

<style scoped>
    .google-map {
        width: 100%;
        height: 90vh;
    }

    #map {
        position: relative;
    }

    #map:after {
        width: 40px;
        /*width: 22px;*/
        height: 40px;
        display: block;
        content: ' ';
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -40px 0 0 -20px;
        /*margin: -40px 0 0 -11px*/
        /*background: url('https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png');*/
        background: url("https://maps.google.com/mapfiles/ms/icons/blue-dot.png");
        background-size: 40px 40px; /* Since I used the HiDPI marker version this compensates for the 2x size */
        /*background-size: 22px 40px;*/
        pointer-events: none; /* This disables clicks on the marker. Not fully supported by all major browsers, though */
    }
</style>
