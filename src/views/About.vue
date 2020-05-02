<template>
<!--  <Notice text="Page under maintainance"></Notice>-->
  <div class="about">
    <v-card class="mx-auto elevation-12 text-center" max-width="500" style="top: 20vh">
      <v-list>
        <v-list-item-title class="headline mb-1 mx-auto">About Us...</v-list-item-title>
        <v-list-item>
          'ত্রাণচিত্র' সমন্বয় বাংলাদেশের একটি উদ্যোগ যা একটি ম্যাপভিত্তিক ডাটাবেইজের সাহায্যে বাংলাদেশে বেসরকারী ত্রাণব্যবস্থার সামগ্রিক চিত্র উপস্থাপন করে৷ দেশব্যাপী যেসব সেচ্ছাসেবী সংগঠন দুর্যোগ ব্যবস্থাপনায় অসহায় জনগোষ্ঠীর পাশে দাঁড়াচ্ছে, ত্রাণচিত্র মূলত তাদের ত্রাণ-সংক্রান্ত সকল তথ্য (লোকেশন, সুবিধাভোগীদের সংখ্যা, ত্রাণ বিতরণের তারিখ, ত্রাণের ধরণ ইত্যাদি) চিত্রিত করছে৷ দেশব্যাপী এ ধরনের সমন্বয়ের মাধ্যমে ত্রাণব্যবস্থার স্বচ্ছতা, ত্রাণ বণ্টন ব্যবস্থার কার্যকারীতা ও ডোনারদের মনিটরিং ব্যবস্থা নিশ্চিত করা সম্ভব হবে।
        </v-list-item>
        <v-card-actions>
          <v-btn class="primary lighten-2" block to="/search">Go to maps</v-btn>
        </v-card-actions>
      </v-list>
    </v-card>
  </div>
</template>
<script>
  import Notice from "./Notice";
  export default {
    name: "About",
    components:{
      Notice
    }
  }
</script>

<style scoped>

</style>