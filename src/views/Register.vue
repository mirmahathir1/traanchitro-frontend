<template>
    <div>
    <v-card class="mx-auto elevation-12" max-width="500" style="top: 10vh" v-if="!requestCompleted">
        <v-toolbar
                dark
                flat
                class="primary darken-4"
        >
            <v-toolbar-title>Enlist your organization</v-toolbar-title>
            <v-spacer />
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                        color="primary"
                        label="Organization Name"
                        name="organization"
                        type="text"
                />
                <v-text-field
                        color="primary"
                        label="Brief Description of Organization"
                        name="description"
                        type="text"
                />
                <v-text-field
                        color="primary"
                        label="Contact No."
                        name="contact"
                        type="text"
                />
                <v-text-field
                        color="primary"
                        label="Email"
                        name="email"
                        type="text"
                />
                <v-text-field
                        color="primary"
                        label="Facebook"
                        name="facebook"
                        type="text"
                />
                <v-text-field
                        color="primary"
                        label="Website"
                        name="website"
                        type="text"
                />


            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn class="primary" light @click="registerClicked" :loading="registerLoaderFlag">Register</v-btn>
        </v-card-actions>
    </v-card>

    <v-card class="mx-auto elevation-12" max-width="500" style="top: 10vh" v-else>
        <v-card-text>
            {{notificationText}}
        </v-card-text>
        <v-card-actions>

            <v-btn class="primary lighten-2" block @click="registerClicked" to="/">Go to maps</v-btn>
        </v-card-actions>
    </v-card>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data:()=>{
            return{
                notificationText: "You registration has been completed successfully. We will contact you soon",
                requestCompleted: false,
                registerLoaderFlag:false,
            }
        },
        methods:{
            registerClicked(){
                console.log("Register Clicked");
                this.requestCompleted=false;
                this.registerLoaderFlag=true;
                setTimeout(()=>{
                    this.registerLoaderFlag=false;
                    this.requestCompleted=true;
                },2000);
            }
        }
    }
</script>

<style scoped>

</style>