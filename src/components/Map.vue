<template>
    <div>
        <div class="google-map" ref="googleMap"></div>
        <template v-if="Boolean(this.google) && Boolean(this.map)">
            <slot
                    :google="google"
                    :map="map"
            />
        </template>
        <v-btn absolute dark fab top right color="light-blue" style="top: 80vh;right: 15vw">
            <v-icon @click="refreshClicked()">mdi-reload</v-icon>
        </v-btn>
        <v-snackbar
                v-model="snackbar"
                v-if="$store.getters.getDragZoomNotifier"
                vertical
                color="black"
                left
                style="width: 300px"
        >
            {{ snackbarText }}
            <div>
            <v-btn
                    color="white"
                    text
                    @click="stopDragZoomNotifier"
            >
                Don't show again
            </v-btn>
            <v-btn
                    color="white"
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
            </div>

        </v-snackbar>
    </div>
</template>

<script>
    import GoogleMapsApiLoader from "google-maps-api-loader";
    import {eventBus} from "../main";

    export default {


        data() {
            return {
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
                    }
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
            stopDragZoomNotifier(){
                this.$store.commit('stopDragZoomNotifier');
                this.snackbar=false;
            },
            refreshClicked() {
                console.log('Refresh Clicked');
                console.log('Map bounds:', this.map.getBounds());
            },

            mapListener(data) {
                console.log("Received data inside Map component: ", data);
                console.log("focusPosition: ", data.focusLocation);
                console.log("array of markers: ", data.locations);

                //OVERWRITE
                data.locations = [
                    {lat: 23.7494231, lng: 90.3830754},

                    {lat: 23.688, lng: 90.1}
                ];

                this.map.setCenter(data.focusLocation);


                this.clearAllMarkers();

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

                this.addNewMarkers(data.locations);

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
                this.snackbar=true;
            },
            mapZoomChanged() {
                // console.log("Zoom changed");
                // console.log(this.map.getBounds());
                this.snackbar=true;
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
