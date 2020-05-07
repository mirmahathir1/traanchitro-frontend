<template>
    <Notice text="You have been logged out"></Notice>
    <!--    <v-card class="mx-auto elevation-12" max-width="500" style="top: 20vh">-->
    <!--        <v-list>-->
    <!--            <v-list-item>-->
    <!--                <v-list-item-title>-->
    <!--                    You have been logged out-->
    <!--                </v-list-item-title>-->
    <!--            </v-list-item>-->
    <!--        </v-list>-->
    <!--    </v-card>-->
</template>

<script>
    import axios from 'axios';
    import Notice from "./Notice";

    export default {
        name: "Logout",
        components: {
            Notice
        },
        created() {
            let data = {};

            let headers = {
                'x-auth': localStorage.getItem('x-auth')
            };

            let url = '/api/logout';

            this.$apiRequestLog(url, data, headers);

            // console.log('DATA: ', data);
            //
            // if (headers["x-auth"]) {
            //     console.log("USER IS AUTHORIZED");
            // } else {
            //     console.log("USER IS NOT AUTHORIZED");
            // }

            axios.post(url, data, {
                headers: headers
            }).then((res) => {
                console.log("RESPONSE: ", res);
            }).catch(e => {
                this.$errorMessage(e);
            }).finally(() => {
                console.log('FINISH');
                localStorage.removeItem('x-auth');
                this.$store.commit('logout');
            });
        }
    }
</script>

<style scoped>

</style>