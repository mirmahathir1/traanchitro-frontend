<template>
    <v-card class="mx-auto elevation-12" max-width="500" style="top: 20vh">
        <v-toolbar
                dark
                flat
                class="primary darken-4"
        >
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer/>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                        color="primary"
                        label="Username"
                        name="username"
                        type="text"
                        v-model="username"
                />

                <v-text-field
                        color="primary"
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        v-model="password"
                />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn class="primary lighten-2" @click="signInClicked" :loading="signInLoaderFlag">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Login",
        data() {
            return {
                username: null,
                password: null,

                signInLoaderFlag: false,
            }
        },
        methods: {
            signInClicked() {
                let data = {
                    username: this.username,
                    password: this.password
                };

                console.log('Data: ', data);


                this.signInLoaderFlag = true;
                axios.post('/api/login', data)
                    .then((res) => {
                        if (res.data.token) {
                            console.log('token received');
                        }
                        //console.log(res.data);
                        this.$store.commit('setToken', res.data.token);
                        this.$router.push({name: 'Search'});
                        localStorage.setItem('x-auth', res.data.token);
                        this.$store.commit('login');
                    }).catch(e => {
                    console.log('error');
                    console.log(e.response);
                }).finally(() => {
                    console.log('finished');
                    this.signInLoaderFlag = false;
                });


                //turjo
                //biri001
            }
        }
    }
</script>

<style scoped>

</style>