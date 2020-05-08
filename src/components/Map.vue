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
            পিন দেখতে রিলোড বাটন (নিচে ডান কোণায়) চাপুন
            <div>
                <v-btn color="white" text @click="stopSnackbar">Close</v-btn>
            </div>
        </v-snackbar>

        <RightFilter></RightFilter>

        <p style="position: fixed; bottom: 20vh; left: 30vw; background-color:rgba(255, 255, 255, 0.5);"
           class="red--text pa-2">{{errorText}}</p>

    </div>
</template>

<script>
    import {eventBus} from "../main";
    import axios from 'axios';
    import RightFilter from "./RightFilter";
    //import MarkerClusterer from "@google/markerclusterer";
    import {} from 'node-js-marker-clusterer'

    export default {
        components: {
            RightFilter,

        },

        watch:{
          '$store.getters.getMaps'(to,from){
              if(!to)return;
              this.initializeMap();
          }
        },
        data() {
            return {
                reloadLoaderFlag: false,

                sheet: false,
                snackbar: true,

                map: null,
                maps: null,
                markerCluster: null,
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

                //real time data loading maps
                mapDragDetected: false,
                mapBusy: false,

                errorText: null,

            };
        },

        async mounted() {
            if(this.$store.getters.getMaps){
                this.initializeMap();
            }
        },



        methods: {
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

                this.errorText = null;

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
                let url = '/api/pins';

                this.$apiRequestLog(url, params, headers);

                this.reloadLoaderFlag = true;
                axios.get(url, {
                    headers: headers,
                    params: params
                }).then((res) => {
                    console.log('RESPONSE: ', res);
                    let data = {
                        locations: res.data.locations,
                    };
                    this.putMarkersOnBound(data);
                }).catch(e => {
                    this.errorText = this.$errorMessage(e);
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
                // let newLocations = [];
                //
                // locations.forEach((location) => {
                //     let alreadyExists = false;
                //
                //     for (let i = 0; i < this.markers.length; i++) {
                //         if (this.markers[i].position.lat() === location.lat || this.markers[i].position.lng() === location.lng) {
                //             alreadyExists = true;
                //             break;
                //         }
                //     }
                //
                //     if (!alreadyExists) {
                //         newLocations.push(location);
                //     }
                // });
                //
                // console.log("new markers added to map: ", newLocations.length);

                locations.forEach((location) => {
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
                });

                //MARKER CLUSTERING
                if (this.markerCluster) {
                    this.markerCluster.clearMarkers();
                }
                this.markerCluster = new MarkerClusterer(this.map, this.markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
            },

            seeMarkerDetails(position) {
                //console.log("Selected marker: ", position.latLng.lat(), position.latLng.lng());
                let selectedLocation = {
                    lat: position.latLng.lat(),
                    lng: position.latLng.lng()
                };
                this.map.setCenter(selectedLocation);

                let newPath = '/search/details/' + JSON.stringify(selectedLocation);

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
                //console.log("Map dragend detected");
                this.mapDragDetected = true;
            },
            mapZoomChanged() {
                //console.log("Map zoom detected");
                this.mapDragDetected = true;
            },

            initializeMap() {
                console.log("Map initialized");

                this.maps = this.$store.getters.getMaps;
                const mapContainer = this.$refs.googleMap;
                this.map = new this.maps.Map(mapContainer, this.mapConfig);
                //this.map.addListener('click', this.mapClicked);
                this.map.addListener('dragend', this.mapDragEnded);
                this.map.addListener('zoom_changed', this.mapZoomChanged);

                //if(!eventBus._events.resetAndShow) {
                    eventBus.$on('resetAndShow', (data) => {
                        this.mapListener(data);
                    });
                //}

                //if(!eventBus._events.reloadMap) {
                    eventBus.$on('reloadMap', () => {
                        this.refreshClicked();
                    });
                //}
            },
            //      mapLiveReloadHandler() {
            //     if (this.mapDragDetected && !this.mapBusy) {
            //         this.mapBusy = true;
            //
            //
            //         let bounds = this.map.getBounds();
            //
            //         let params = {
            //             bounds: {
            //                 northeast: {
            //                     lat: bounds.Ya.j,
            //                     lng: bounds.Ua.j,
            //                 },
            //                 southwest: {
            //                     lat: bounds.Ya.i,
            //                     lng: bounds.Ua.i
            //                 }
            //             },
            //             filter: this.$store.getters.getFilters
            //         };
            //         let headers = {
            //             'x-auth': localStorage.getItem('x-auth'),
            //         };
            //         console.log('PARAMS: ', params);
            //
            //         if (headers["x-auth"]) {
            //             console.log("USER IS AUTHORIZED");
            //         } else {
            //             console.log("USER IS NOT AUTHORIZED");
            //         }
            //
            //         this.reloadLoaderFlag = true;
            //         axios.get('/api/pins',
            //             {
            //                 headers: headers,
            //                 params: params
            //             })
            //             .then((res) => {
            //                 console.log('RESPONSE: ', res);
            //                 this.addNewMarkers(res.data.locations);
            //             }).catch(e => {
            //             console.log('ERROR: ', e.response);
            //         }).finally(() => {
            //             console.log("FINISH");
            //             this.reloadLoaderFlag = false;
            //             this.mapBusy = false;
            //             this.mapDragDetected = false;
            //         });
            //     }
            // },
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
