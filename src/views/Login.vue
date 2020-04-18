<template>
                        <v-card class="mx-auto elevation-12" max-width="500" style="top: 20vh">
                            <v-toolbar
                                    dark
                                    flat
                                    class="primary darken-4"
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            color="primary"
                                            label="Username"
                                            name="username"
                                            type="text"
                                    />

                                    <v-text-field
                                            color="primary"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn class="primary lighten-2" @click="signInClicked">Login</v-btn>
                            </v-card-actions>
                        </v-card>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Login",
        methods:{
            signInClicked(){
                let sendData={
                    address: "33/3, Azimpur"
                };
                console.log('Sign in clicked');
                axios.post('http://localhost:5000/test/',sendData)
                .then((res)=>{
                    console.log(res.data);
                }).catch(e=>{
                    console.log('error');
                }).finally(()=>{
                    console.log('finished');
                })
            }
        }
    }
</script>

<style scoped>

</style>