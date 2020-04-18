<template>
  <div>
    <div
            class="google-map"
            ref="googleMap"
    ></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
              :google="google"
              :map="map"
      />
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
        centerMarker: null,

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

      eventBus.$on('searchClicked',(data)=>{
        this.searchClicked(data);
      })

    },

    methods: {
      searchClicked(data){
        console.log("Received data in location selector: ",data);

        this.map.setCenter(data.focusLocation);

        this.centerMarker.setPosition(this.map.getCenter());
        this.setLocation(this.map.getCenter());

        //fit the map according to the bound of the new area
        if(data.bounds!=undefined) {
          let northeastlatlng = new this.google.maps.LatLng(data.bounds.northeast.lat, data.bounds.northeast.lng);
          let southwestlatlng = new this.google.maps.LatLng(data.bounds.southwest.lat, data.bounds.southwest.lng);
          var bounds = new this.google.maps.LatLngBounds();
          bounds.extend(northeastlatlng);
          bounds.extend(southwestlatlng);
          this.map.fitBounds(bounds);
        }
        else{
          this.map.setZoom(17);
        }
      },

      seeMarkerDetails(position){
        console.log(position.latLng.lat(),position.latLng.lng());
        this.currentPosition={
          lat: position.latLng.lat(),
          lng: position.latLng.lng()
        };
        this.map.setCenter(this.currentPosition);
        this.$router.push('/search/details/'+JSON.stringify(this.currentPosition));

      },
      mapClicked(position){
        let clickedPosition = {
          lat: position.latLng.lat(),
          lng: position.latLng.lng()
        };
        console.log(clickedPosition);
      },
      mapDragEnded(){
        //console.log("Map dragged and bounds changed");
        //console.log(this.map.getBounds());

        this.setLocation(this.map.getCenter());
      },
      mapZoomChanged(){
        //console.log("Zoom changed");
        //console.log(this.map.getBounds());

        this.setLocation(this.map.getCenter());
      },

      mapBoundsChanged(){
        this.centerMarker.setPosition(this.map.getCenter());
      },
      initializeMap() {
        const mapContainer = this.$refs.googleMap;
        this.map = new this.google.maps.Map(mapContainer, this.mapConfig);


        this.centerMarker = new this.google.maps.Marker({
          position:{
            lat: this.map.getCenter().lat(),
            lng: this.map.getCenter().lng()
          },
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          },
          map: this.map,
        });
        this.map.addListener('bounds_changed',this.mapBoundsChanged);
        this.map.addListener('dragend',this.mapDragEnded);
        this.map.addListener('zoom_changed',this.mapZoomChanged);
      }
    }
  };
</script>

<style scoped>
  .google-map {
    width: 100%;
    height: 50vh;
  }
</style>
