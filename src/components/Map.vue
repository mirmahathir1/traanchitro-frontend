<template>
    <div>
        <div class="google-map" ref="googleMap" id="map"></div>
        <template v-if="Boolean(this.google) && Boolean(this.map)">
            <slot
                    :google="google"
                    :map="map"
            />
        </template>

        <v-btn absolute dark fab top right color="light-blue" style="top: 70vh;right: 5vw">
            <v-icon @click="addButtonClicked()">mdi-plus</v-icon>
        </v-btn>

        <v-btn absolute dark fab top right color="light-blue" style="top: 80vh;right: 5vw" :loading="reloadLoaderFlag">
            <v-icon @click="refreshClicked()">mdi-reload</v-icon>
        </v-btn>

<!--        <v-snackbar v-model="snackbar" v-if="$store.getters.getDragZoomNotifier" vertical color="black" left style="width: 300px">-->
<!--            {{ snackbarText }}-->
<!--            <div>-->
<!--                <v-btn color="white" text @click="stopDragZoomNotifier">Don't show again</v-btn>-->
<!--                <v-btn color="white" text @click="snackbar = false">Close</v-btn>-->
<!--            </div>-->
<!--        </v-snackbar>-->

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
            eventBus.$on('reloadMap',()=>{
                this.refreshClicked();
            })
        },

        methods: {
            addButtonClicked(){
                //console.log('Map center: ',this.map.getCenter());
                //console.log('Map bounds: ',this.map.getBounds());
                let bounds = this.map.getBounds();
                let newReliefLocation = {
                    focusLocation:{
                        lat:this.map.getCenter().lat(),
                        lng:this.map.getCenter().lng()
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
                this.$store.commit('setNewReliefLocation',newReliefLocation);
                //console.log('Set newReliefLocation in Map.vue: ',this.$store.getters.getNewReliefLocation);
                this.$router.push({name: 'Add'});
            },

            stopDragZoomNotifier() {
                this.$store.commit('stopDragZoomNotifier');
                this.snackbar = false;
                localStorage.setItem('stopDragZoomNotifier','false');
            },
            refreshClicked() {
                //console.log('Refresh Clicked');

                let bounds = this.map.getBounds();
                //console.log('Map bounds:', bounds);

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
                console.log('PARAMS: ',params);

                if(headers["x-auth"]){
                    console.log("USER IS AUTHORIZED");
                }else{
                    console.log("USER IS NOT AUTHORIZED");
                }

                this.reloadLoaderFlag=true;
                axios.get('/api/pins',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res)=>{
                        console.log('RESPONSE: ',res);
                        let data = {
                            locations: res.data.locations,
                        };
                        this.putMarkersOnBound(data);
                    }).catch(e=>{
                    console.log('ERROR: ',e.response);
                }).finally(()=>{
                    this.reloadLoaderFlag=false;
                });
            },

            putMarkersOnBound(data){
                //console.log("array of markers: ", data.locations);
                this.clearAllMarkers();
                this.addNewMarkers(data.locations);
            },

            mapListener(data) {
                //console.log("focusPosition: ", data.focusLocation);
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
                        animation: this.google.maps.Animation.DROP
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
        background: url("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
        background-size: 40px 40px; /* Since I used the HiDPI marker version this compensates for the 2x size */
        /*background-size: 22px 40px;*/
        pointer-events: none; /* This disables clicks on the marker. Not fully supported by all major browsers, though */
    }
</style>
