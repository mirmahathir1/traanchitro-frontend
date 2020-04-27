<template>
    <div class="text-center" style="text-align: center;">
        <h1>
            <img :src="require('../assets/Logo-Black.png')"
                 style="width: 150px;height: 150px"
                 class="mt-9"
            >
        </h1>
        <h1>ত্রাণচিত্র</h1>
        <p>A Website for COVID-19 Relief Distribution and Management</p>
        <v-btn rounded class="primary" style="top: 5vh" to="/search">
            Explore
        </v-btn>
    </div>
</template>

<script>


    export default {
        name: 'Home',
        components: {},
        mounted() {

        }
    }
</script>

<style>

</style>