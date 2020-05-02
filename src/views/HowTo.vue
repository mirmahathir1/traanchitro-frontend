<template>
    <div>
    <v-card class="mx-auto elevation-12" max-width="700">

        <v-list>
            <v-list-item-title class="headline mb-1 mx-auto ml-6"><h3>Help</h3></v-list-item-title>
            <v-divider></v-divider>

            <v-list-item class="ma-5">
                সমন্বয় বাংলাদেশ এর ওয়েবসাইট (http://shomonnoibd.com) এ “ত্রাণচিত্র” Tab এ ক্লিক
                করলে ত্রাণচিত্র প্লাটফর্মটির সরাসরি Home অপশন (Option) এ চলে যাবে। আপনার ডিভাইসের
                স্ক্রিন (Screen) এর মাঝামাঝি জায়গায় ত্রানচিত্র সম্পর্কিত একটি সংক্ষিপ্ত বর্ণনা আছে। এর
                ঠিক নিচে Explore লেখা Tab টিতে ক্লিক করলে বাংলাদেশকে কেন্দ্র করে একটি ম্যাপ (map)
                স্ক্রিনে দেখা যাবে। স্ক্রিনের উপরের দিকে অপেক্ষাকৃত ডানপাশে ৮টি অপশনের একটি Top bar
                দেখা যাবে। অপশনগুলোঃ
            </v-list-item>

            <v-list-item class="ma-5">
                <ul>
                    <li>HOME</li>
                    <li>SEARCH RELIEF</li>
                    <li>ADD RELIEF</li>
                    <li>ORGANIZATION</li>
                    <li>REGISTER</li>
                    <li>ABOUT US</li>
                    <li>HELP</li>
                    <li>SIGN OUT</li>
                </ul>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="ma-5"><h3><u> কোনো নির্দিষ্ট স্থানে এখন পর্যন্ত পরিচালিত ত্রাণ কর্মসূচীগুলা সম্পর্কে জানতে চাইলেঃ </u></h3></v-list-item>
            <v-list-item class="ma-5">

                SEARCH RELIEF অপশনটিতে ক্লিক করলে একটি ছোট window আসবে, যেখানে নির্দিষ্ট
                স্থানের নাম লিখে সার্চ এর লোগোতে ক্লিক করলে ঐ নির্দিষ্ট স্থানে যতগুলো ত্রাণ কার্যক্রম
                সম্পন্ন হয়েছে সেগুলো ম্যাপ এ নিদিষ্ট স্থানের মধ্যে লাল লোকেশন লোগো দিয়ে চিহ্নিত অবস্থায়
                দেখা যাবে। এবার সেই লোকেশন লোগো এর যেকোনোটিতে ক্লিক করলে স্ক্রিনের অপেক্ষাকৃত নিচের
                দিকে “List of Relief Activities in this Location” নামের একটি window তে ঐ লোকেশনে কি কি
                ত্রাণ কার্যক্রম হয়েছে সেগুলো পয়েন্ট আকারে (Activity and Activity Type) দেখা যাবে। যে
                কোনো Activity তে ক্লিক করলে সেই ত্রাণ কার্যক্রমটি কোন Organization করেছিল, কোন
                স্থানটিতে করেছিল, কি ধরনের ত্রাণ (Food, PPE, masks, gloves, sanitizer) দিয়েছিল জানা
                যাবে। ঐ window এর “see more” ট্যাবে ক্লিক করলে ঐ কার্যক্রমের যাবতীয় বিস্তারিত বিবরণ
                দেখা যাবে। কাজ শেষ হলে window টির উপরের দিকের ডানপাশে close ট্যাব এ কিক করলে
                SEARCH RELIEF অপশনে আবার কোনো নির্দিষ্ট স্থানে হয়ে যাওয়া যাবতীয় ত্রাণ কার্যক্রম
                সম্বন্ধে একইভাবে জানা যাবে।
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item class="ma-5"><h3><u> কোনো নির্দিষ্ট Organization কি কি ত্রাণ কর্মসূচী ইতিমধ্যে করেছে সে সম্পর্কে জানতে চাইলেঃ </u></h3></v-list-item>
            <v-list-item class="ma-5">

                ORGANIZATION অপশনটিতে ক্লিক করলে একটি ছোট window আসবে, যেখানে নির্দিষ্ট
                Organization এর নাম লিখে ঐ window এর সার্চ ট্যাবে ক্লিক করলে আরেকটি নতুন window তে
                ঐ Organization এর শিরোনামের নিচে সেই Organization এর ছোট বিবরণ, ডোনেশন তথ্য,
                কন্ট্যাক্ট তথ্য (phone, email, website, facebook), এবং তাদের যাবতীয় ত্রানের রেকর্ডের
                তালিকা দেখা যাবে। রেকর্ডগুলি নতুন কার্যক্রম থেকে পুরাতন কার্যক্রম অনুযায়ী সাজানো আছে
                ত্রানের ধরন উল্লেখের মাধ্যমে। Scroll করার মাধ্যমে সবগুলো ত্রাণের ধরন (relief type) দেখা
                যাবে। যেকোনো ত্রাণ রেকর্ডের ধরনে ক্লিক করলে ত্রাণ সম্পাদনের তারিখ ও কন্টেন্ট (content –
                যাবতীয় বিবরন) দেখা যাবে।
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item class="ma-5"><h3><u> কোনো Organization কিভাবে Register করবে আর তাদের ত্রাণ কার্যক্রমগুলোকে অন্তর্ভুক্ত করতে পারবেঃ </u></h3></v-list-item>
            <v-list-item class="ma-5">

                REGISTER অপশনে ক্লিক করার পর একটি window আসবে যেখানে Organization এর নাম,
                সংক্ষিপ্ত বিবরন, যাবতীয় কন্ট্যাক্ট তথ্য দিয়ে window টির একদম নিচে ডানদিকে REGISTER
                ট্যাবে ক্লিক করলে আপনার এই তথ্য আমাদের কাছে (সমন্বয় ও ত্রাণচিত্র টিম) চলে আসবে এবং
                আমরা কিছু সময়ের রিভিউয়ের মাধ্যমে আপনার দেয়া ইমেইলে একটি ইমেইল পাঠিয়ে দেয়া হবে এবং
                আপনার দেয়া মোবাইলে যোগাযোগের মাধ্যমে তা জানিয়ে দেয়া হবে। ইমেইলটিতে আপনার Username
                ও password দিয়ে দেবা হবে।
                এরপর আপনি ত্রাণচিত্র প্লাটফর্ম গিয়ে SIGN IN অপশনে ক্লিক করে Login নামের window তে
                আপনার Username ও password দিয়ে window টির LOGIN অপশনে ক্লিক করে আপনি লগইন
                করতে পারবেন।
                এবার (SIGNIN করার পর) আপনি আপনার Organization এর সকল ত্রাণ কার্যক্রমকে
                ত্রাণচিত্রের ডেটাবেসে অন্তর্ভুক্ত করতে পারবেন। এরপর ADD RELIEF অপশনে ক্লিক করলে
                একটি window তে ত্রাণের স্থান, তারিখ, ধরন ও অন্যান্য বিবরন দেয়ার পর window টির
                নিচেরদিকে SAVE অপশনে ক্লিক করলে ত্রান কার্যক্রমটি ডেটাবেসে অন্তর্ভুক্ত হয়ে যাবে।
                এছাড়া ABOUT US অপশনে ক্লিক করে আমাদের টিম সম্বন্ধে জানতে পারা যাবে।
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
        name: "HowTo",
        components:{
            Notice
        }
    }
</script>

<style scoped>

</style>