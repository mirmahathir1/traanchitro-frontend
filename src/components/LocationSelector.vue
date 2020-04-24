<template>
    <div>
        <div
                class="google-map"
                ref="googleMap"
                id="map"
        ></div>
        <template v-if="Boolean(this.google) && Boolean(this.map)">
            <slot
                    :google="google"
                    :map="map"
            >
            </slot>
        </template>
    </div>
</template>

<script>
    import GoogleMapsApiLoader from "google-maps-api-loader";
    import {eventBus} from "../main";

    export default {
        props: ['setLocation'],
        data() {
            return {
                sheet: false,

                google: null,
                map: null,

                mapConfig: {
                    center: {lat: 23.6850, lng: 90.3563},
                    zoom: 9,
                    options: {
                        gestureHandling: 'greedy'
                    }
                },

                currentPosition: null,
                apiKey: process.env.VUE_APP_API_KEY
            };
        },

        async mounted() {
            const googleMapApi = await GoogleMapsApiLoader({
                apiKey: this.apiKey,
            });
            this.google = googleMapApi;
            this.initializeMap();

            eventBus.$on('searchClicked', (data) => {
                this.searchClicked(data);
            })

        },

        methods: {
            searchClicked(data) {
                console.log("Received data in location selector: ", data);

                this.map.setCenter(data.focusLocation);


                this.setLocation(this.map.getCenter());

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
            },

            seeMarkerDetails(position) {
                console.log(position.latLng.lat(), position.latLng.lng());
                this.currentPosition = {
                    lat: position.latLng.lat(),
                    lng: position.latLng.lng()
                };
                this.map.setCenter(this.currentPosition);
                this.$router.push('/search/details/' + JSON.stringify(this.currentPosition));

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

                this.setLocation(this.map.getCenter());
            },
            mapZoomChanged() {
                //console.log("Zoom changed");
                //console.log(this.map.getBounds());

                this.setLocation(this.map.getCenter());
            },

            mapBoundsChanged() {

            },
            initializeMap() {
                const mapContainer = this.$refs.googleMap;
                this.map = new this.google.maps.Map(mapContainer, this.mapConfig);


                this.map.addListener('bounds_changed', this.mapBoundsChanged);
                this.map.addListener('dragend', this.mapDragEnded);
                this.map.addListener('zoom_changed', this.mapZoomChanged);
            }
        }
    };
</script>

<style scoped>
    .google-map {
        width: 100%;
        height: 50vh;
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
