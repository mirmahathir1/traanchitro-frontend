<template>
    <div>
        <v-card class="mx-auto mb-5 elevation-12" max-width="500" v-if="!requestCompleted">
            <v-toolbar
                    dark
                    flat
                    class="primary darken-4"
            >
                <v-toolbar-title>Enlist your organization</v-toolbar-title>
                <v-spacer/>
            </v-toolbar>
            <v-card-text>
                <v-form>
                    <v-text-field
                            color="primary"
                            label="Organization Name"
                            name="organization"
                            type="text"
                            v-model="name"
                    />
                    <v-textarea
                            outlined
                            color="primary"
                            label="Brief Description of Organization"
                            name="description"
                            type="text"
                            v-model="description"
                    />
                    <v-text-field
                            color="primary"
                            label="Contact No."
                            name="phone"
                            type="text"
                            v-model="phone"
                    />
                    <v-text-field
                            color="primary"
                            label="Email"
                            name="email"
                            type="text"
                            v-model="email"
                    />
                    <v-text-field
                            color="primary"
                            label="Facebook"
                            name="facebook"
                            type="text"
                            v-model="facebook"
                    />
                    <v-text-field
                            color="primary"
                            label="Website"
                            name="website"
                            type="text"
                            v-model="website"
                    />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
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
    import axios from "axios";

    export default {
        name: "Register",
        data: () => {
            return {
                notificationText: "You registration has been completed successfully. We will contact you soon",
                requestCompleted: false,
                registerLoaderFlag: false,

                name: null,
                description: null,
                phone: null,
                email: null,
                facebook: null,
                website: null,
            }
        },
        methods: {
            registerClicked() {

                let data = {
                    orgName: this.name,
                    description: this.description,
                    phone: this.phone,
                    email: this.email,
                    facebook: this.facebook,
                    website: this.website
                };
                let headers = {
                    TOKEN: this.$store.getters.getToken,
                };
                console.log('data: ',data);
                console.log('headers: ',headers);


                this.requestCompleted = false;
                this.registerLoaderFlag = true;
                axios.post('/api/register', data, {
                    headers: headers
                }).then((res) => {
                    console.log(res.data);
                }).catch(e => {
                    console.log('error');
                }).finally(() => {
                    console.log('finished');
                    this.registerLoaderFlag = false;
                    this.requestCompleted = true;
                });

            }
        }
    }
</script>

<style scoped>

</style>