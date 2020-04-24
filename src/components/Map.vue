<template>
    <div>
        <div class="google-map" ref="googleMap"></div>
        <template v-if="Boolean(this.google) && Boolean(this.map)">
            <slot
                    :google="google"
                    :map="map"
            />
        </template>

        <v-btn absolute dark fab top right color="light-blue" style="top: 80vh;right: 10vw" :loading="reloadLoaderFlag">
            <v-icon @click="refreshClicked()">mdi-reload</v-icon>
        </v-btn>

        <v-snackbar v-model="snackbar" v-if="$store.getters.getDragZoomNotifier" vertical color="black" left style="width: 300px">
            {{ snackbarText }}
            <div>
                <v-btn color="white" text @click="stopDragZoomNotifier">Don't show again</v-btn>
                <v-btn color="white" text @click="snackbar = false">Close</v-btn>
            </div>
        </v-snackbar>

        <RightFilter></RightFilter>

    </div>
</template>

<script>
    import GoogleMapsApiLoader from "google-maps-api-loader";
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
                snackbarText: "Please press reload to show pins",

                google: null,
                map: null,
                markers: [],

                mapConfig: {
                    center: {lat: 23.6850, lng: 90.3563},
                    zoom: 9,
                    options: {
                        gestureHandling: 'greedy'
                    },
                    disableDefaultUI: true,
                },

                currentPosition: null,
                apiKey: process.env.VUE_APP_API_KEY,


            };
        },

        async mounted() {
            const googleMapApi = await GoogleMapsApiLoader({
                apiKey: this.apiKey
            });

            this.google = googleMapApi;
            this.initializeMap();

            eventBus.$on('resetAndShow', (data) => {
                this.mapListener(data);
            });
        },

        methods: {
            stopDragZoomNotifier() {
                this.$store.commit('stopDragZoomNotifier');
                this.snackbar = false;
            },
            refreshClicked() {
                console.log('Refresh Clicked');

                let bounds = this.map.getBounds();
                console.log('Map bounds:', bounds);

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
                    filter: {
                        typeOfRelief: [],
                        schedule: 'PAST',
                        orgName: null
                    }
                };

                let headers = {
                    TOKEN: this.$store.getters.getToken,
                };
                console.log('params: ',params,", headers: ",headers);

                this.reloadLoaderFlag=true;
                //https://stormy-lake-20015.herokuapp.com/api/pins
                //axios.get('http://localhost:5000/test',
                axios.get('https://stormy-lake-20015.herokuapp.com/api/pins',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res)=>{
                        //console.log(res.data);
                        let data = {
                            //focusLocation:this.map.getCenter(),
                            locations: res.data.locations,
                        };
                        console.log(data);
                        this.putMarkersOnBound(data);
                    }).catch(e=>{
                    console.log('error');
                }).finally(()=>{
                    console.log('finished');
                    this.reloadLoaderFlag=false;
                });

            },

            putMarkersOnBound(data){
                console.log("array of markers: ", data.locations);
                this.clearAllMarkers();
                this.addNewMarkers(data.locations);
            },

            mapListener(data) {
                console.log("focusPosition: ", data.focusLocation);
                this.map.setCenter(data.focusLocation);

                //fit the map according to the bound of the new area
                if (data.bounds != undefined) {
                    let northeastlatlng = new this.google.maps.LatLng(data.bounds.northeast.lat, data.bounds.northeast.lng);
                    let southwestlatlng = new this.google.maps.LatLng(data.bounds.southwest.lat, data.bounds.southwest.lng);
                    var bounds = new this.google.maps.LatLngBounds();
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


                locations.forEach((location) => {
                    let marker = new this.google.maps.Marker({
                        position: {
                            lat: location.lat,
                            lng: location.lng
                        },
                        map: this.map,
                    });
                    this.markers.push(marker);
                    marker.addListener('click', this.seeMarkerDetails);
                    console.log(location);
                });
            },

            seeMarkerDetails(position) {
                console.log(position.latLng.lat(), position.latLng.lng());
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
                //console.log("Map dragged and bounds changed");
                //console.log(this.map.getBounds());
                this.snackbar = true;
            },
            mapZoomChanged() {
                // console.log("Zoom changed");
                // console.log(this.map.getBounds());
                this.snackbar = true;
            },

            initializeMap() {
                const mapContainer = this.$refs.googleMap;
                this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
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
</style>
