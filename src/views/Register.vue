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
                            v-model="name"
                            :error-messages="nameErrors"
                            label="Organization Name"
                            required
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                    ></v-text-field>

                    <v-textarea
                            outlined
                            color="primary"
                            label="Brief Description of Organization"
                            name="description"
                            type="text"
                            v-model="description"
                            required
                            @input="$v.description.$touch()"
                            @blur="$v.description.$touch()"
                            :error-messages="descriptionErrors"
                    />

                    <v-text-field
                            color="primary"
                            label="Contact No. (11 digits)"
                            name="phone"
                            type="text"
                            v-model="phone"
                            required

                            @input="$v.phone.$touch()"
                            @blur="$v.phone.$touch()"
                            :error-messages="phoneErrors"
                    />
                    <v-text-field
                            v-model="email"
                            label="E-mail"
                    ></v-text-field>
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
    import {required, maxLength, numeric, email, minLength} from 'vuelidate/lib/validators';

    export default {
        name: "Register",
        validations: {
            name: {required},
            phone: {required, numeric, maxLength: maxLength(11)},
            description: {required, minLength: minLength(10)}
        },
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.name.$dirty) return errors;
                !this.$v.name.required && errors.push('Name is required.');
                return errors
            },
            phoneErrors() {
                const errors = [];
                if (!this.$v.phone.$dirty) return errors;
                !this.$v.phone.required && errors.push('Phone number is required.');
                !this.$v.phone.numeric && errors.push('Phone number should be numeric.');
                !this.$v.phone.maxLength && errors.push('Phone number should be of max 11 digits');
                return errors
            },
            descriptionErrors() {
                const errors = [];
                if (!this.$v.description.$dirty) return errors;
                !this.$v.description.required && errors.push('Description is required.');
                !this.$v.description.minLength && errors.push('Description should be of minimum 10 characters');
                return errors
            }
        },
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
                this.$v.$touch();
                if (this.$v.$anyError) {
                    return;
                }

                if (this.website === '') {
                    this.website = null;
                }
                if (this.facebook === '') {
                    this.facebook = null;
                }
                if (this.email === '') {
                    this.email = null;
                }

                console.log(this.$v);
                let data = {
                    orgName: this.name,
                    description: this.description,
                    phone: '+88' + this.phone,
                    email: this.email,
                    facebook: this.facebook,
                    website: this.website
                };

                console.log('data: ', data);
                //console.log('headers: ', headers);


                this.requestCompleted = false;
                this.registerLoaderFlag = true;
                axios.post('/api/register', data)
                    .then((res) => {
                        console.log(res.data);
                        this.requestCompleted = true;
                    }).catch(e => {
                    console.log('error: ', e.response);
                }).finally(() => {
                    console.log('finished');
                    this.registerLoaderFlag = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>