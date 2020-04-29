<template>
    <div class="text-center" style="text-align: center;">
        <h1>
            <img :src="require('../assets/Logo-Black.png')"
                 style="width: 150px;height: 150px"
                 class="mt-7"
            >
        </h1>
        <h1>ত্রাণচিত্র</h1>
        <p>বর্তমানে বিশ্বব্যাপী ছড়িয়ে পরা করোনাভাইরাস মহামারি আমাদের দেশে ত্রাণ কর্মকাণ্ড সমন্বয়ের গুরুত্ব পুনরায় অনুধাবন করতে সাহায্য করেছে। </p><p> বাংলাদেশের ত্রাণ কর্মকাণ্ড সমন্বয়ের ক্ষেত্রে প্রথম প্ল্যাটফর্ম হিসাবে আমরা তাই নিয়ে এসেছি <b> ত্রাণচিত্র </b></p>
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