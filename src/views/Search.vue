<template>
    <div>
    <Map></Map>
        <router-view>
            <BottomPopup></BottomPopup>
        </router-view>
    </div>
</template>

<script>
    import Map from "../components/Map";
    import BottomPopup from "../components/BottomPopup";
    export default {
        name: "Search",
        components:{
            Map,
            BottomPopup
        }
    }
</script>

<style scoped>

</style>