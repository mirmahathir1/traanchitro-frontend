<template>
    <div class="text-center" style="text-align: center;">
        <h1>
            <img :src="require('../assets/Logo-Black.png')"
                 style="width: 150px;height: 150px"
                 class="mt-7"
            >
        </h1>
        <h1>ত্রাণচিত্র</h1>
        <div style="background-color:rgba(255, 255, 255, 0.6)" class="title">
        <p>বর্তমানে বিশ্বব্যাপী ছড়িয়ে পরা করোনাভাইরাস মহামারি আমাদের দেশে ত্রাণ কর্মকাণ্ড সমন্বয়ের গুরুত্ব পুনরায় অনুধাবন করতে সাহায্য করেছে। </p><p> বাংলাদেশের ত্রাণ কর্মকাণ্ড সমন্বয়ের ক্ষেত্রে প্রথম প্ল্যাটফর্ম হিসাবে আমরা তাই নিয়ে এসেছি <b>ত্রাণচিত্র।</b></p>
<!--        <p><b>সমন্বয় বাংলাদেশ</b> দ্বারা পরিচালিত একটি প্ল্যাটফর্ম</p>-->
        </div>
        <v-btn rounded large class="primary" to="/search">
            Explore!
        </v-btn>



            <h1 class="mt-12">
                <a href="https://shomonnoibd.com/" target="_blank">
                    <img :src="require('../assets/Shomonnoi-Final-No-Background.png')"
                         style="background-color:rgba(255, 255, 255, 0.5);width: 80px;height: 80px"

                    >
                </a>
            </h1>
            <p class="title"><b>সমন্বয় বাংলাদেশ</b> দ্বারা পরিচালিত একটি প্ল্যাটফর্ম</p>

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