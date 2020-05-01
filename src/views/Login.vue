<template>
    <v-card class="mx-auto elevation-12" max-width="500" style="top: 20vh">
        <v-toolbar
                dark
                flat
                class="primary darken-4"
        >
            <v-toolbar-title>Sign In</v-toolbar-title>
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
            <p class="red--text">{{errorMessage}}</p>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn class="primary lighten-2" rounded @click="signInClicked" :loading="signInLoaderFlag">Sign In</v-btn>
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

                errorMessage: null
            }
        },
        methods: {
            signInClicked() {
                this.errorMessage=null;

                if(this.password===null) {
                    this.password="";
                }

                let data = {
                    username: this.username,
                    password: this.password
                };

                console.log("LOGIN REQUEST SENT");

                this.signInLoaderFlag = true;
                axios.post('/api/login', data)
                    .then((res) => {
                        if (res.data.token) {
                            console.log('TOKEN RECEIVED');
                        }
                        //console.log(res.data);
                        this.$store.commit('setToken', res.data.token);
                        this.$router.push({name: 'Search'});
                        localStorage.setItem('x-auth', res.data.token);
                        this.$store.commit('login');
                    })
                    .catch(e => {
                        console.log('ERROR: ', e.response);
                        if(e.response.data && e.response.data.message){
                            this.errorMessage = e.response.data.message;
                        }

                    })
                    .finally(() => {
                        console.log('FINISH');
                        this.signInLoaderFlag = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>