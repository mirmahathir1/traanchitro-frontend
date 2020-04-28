<template>
    <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
            class="white"
    >
        <v-list>
            <template v-for="item in items">
                <v-list-item :key="item.text" link :to="item.to">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <v-list-item @click="signOut" to="/logout" v-if="$store.getters.getLoggedIn">
                <v-list-item-action>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        Sign Out
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link to="/login" v-else>
                <v-list-item-action>
                    <v-icon>mdi-login</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        Sign In
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {eventBus} from "../main";

    export default {
        name: "SideDrawer",

        data(){
            return{
                drawer: false,
                items: [
                    { icon: 'mdi-home', text: 'Home',to:'/'},
                    { icon: 'mdi-magnify', text: 'Search Relief',to:'/search' },
                    { icon: 'mdi-plus', text: 'Add Relief',to:'/add' },
                    { icon: 'mdi-contacts', text: 'Organizations',to:'/orgs' },
                    // { icon: 'mdi-login', text: 'Log In',to:'/login' },
                    { icon: 'mdi-pencil', text: 'Register',to:'/reg' },
                    { icon: 'mdi-information', text: 'About us',to:'/about'},
                    { icon: 'mdi-help-circle', text: 'Help',to:'/howto'}
                ],
            }
        },

        mounted() {
            //console.log("Mounted");
            if(!localStorage.getItem('x-auth')){
                console.log('USER IS UNAUTHORIZED');
                this.$store.commit('logout');

            }else{
                console.log('USER IS AUTHORIZED');
                this.$store.commit('login');
            }

            eventBus.$on('toggleDrawer',()=>{
                this.drawer= !this.drawer;
            })
        },
        methods:{
            signOut(){

                //this.$router.push({name: 'Home'});
            }
        }
    }
</script>

<style scoped>

</style>