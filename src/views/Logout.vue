<template>
    <v-card class="mx-auto elevation-12" max-width="500" style="top: 20vh">
        <v-list>
            <v-list-item>
                <v-list-item-title>
                    You have been logged out
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Logout",
        created() {
            let data = {};

            let headers = {
                'x-auth': localStorage.getItem('x-auth')
            };

            console.log('DATA: ', data);

            if (headers["x-auth"]) {
                console.log("USER IS AUTHORIZED");
            } else {
                console.log("USER IS NOT AUTHORIZED");
            }

            axios.post('/api/logout', data, {
                headers: headers
            })
                .then((res) => {
                    console.log("RESPONSE: ", res);

                })
                .catch(e => {
                    console.log('ERROR: ', e.response);
                })
                .finally(() => {
                    console.log('FINISH');
                    localStorage.removeItem('x-auth');
                    this.$store.commit('logout');
                });


        }
    }
</script>

<style scoped>

</style>