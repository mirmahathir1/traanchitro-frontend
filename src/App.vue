<template>
    <v-app id="inspire">
        <SideDrawer v-if="$isMobile()"></SideDrawer>
        <TopBar></TopBar>
        <v-content app class="backimage">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Map from "./components/Map";
    import TopBar from "./components/TopBar";
    import SideDrawer from "./components/SideDrawer";
    import {Plugins} from '@capacitor/core';

    export default {
        props: {
            source: String,
        },
        components: {
            Map,
            SideDrawer,
            TopBar
        },
        created() {
            this.$store.dispatch('fetchOrganizations');
        },
        methods: {
            yourCallBackFunction () {
                if(this.$route.path==="/"){
                    Plugins.App.exitApp();
                }else{
                    this.$router.go(-1);
                }
            }
        },
        mounted () {
            document.addEventListener("backbutton", this.yourCallBackFunction, false);
        },
        beforeDestroy () {
            document.removeEventListener("backbutton", this.yourCallBackFunction);
        }
    }
</script>

<style>
    .backimage {
        background-image: url("assets/landing.jpg");
        /*
        background-position: center;
        background-repeat:repeat;
        height: 100%;
        */
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;

    }
</style>