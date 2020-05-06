<template>
    <div>
        <v-card class="mx-auto mb-5 elevation-12" max-width="500" v-if="!requestCompleted">
            <v-toolbar
                    dark
                    flat
                    class="primary darken-2"
            >
                <v-toolbar-title>Enlist your organization</v-toolbar-title>
                <v-spacer/>
            </v-toolbar>
            <v-card-text>
                <v-form>
                    <v-text-field
                            v-model="name"
                            label="Organization Name"
                            required
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                            :error-messages="nameErrors"
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
                    <v-row>
                        <v-col cols="2">
                            <v-text-field
                                    color="primary"
                                    name="phone"
                                    type="text"
                                    value="+880"
                                    disabled
                            />
                        </v-col>
                        <v-col cols="10">
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
                        </v-col>
                    </v-row>

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
            <p class="red--text pl-5">{{registerError}}</p>
            <v-card-actions>
                <v-spacer/>
                <v-btn class="primary" light @click="registerClicked" :loading="registerLoaderFlag">Register</v-btn>
            </v-card-actions>
        </v-card>

        <v-card class="mx-auto elevation-12 pa-5" max-width="500" style="top: 10vh" v-else>
            <p class="ma-5">
                রেজিস্ট্রেশন করার জন্য ধন্যবাদ।<br>
                ত্রাণচিত্রের পক্ষ থেকে আপনাদের সাথে শীঘ্রই ফোনে বা মেইলে যোগাযোগ করে ইউজারনেম আর পাসওয়ার্ড দিয়ে দেওয়া
                হবে।
            </p>
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
            phone: {
                required, numeric, lengthCheck: (value) => {
                    return value.length === 11;
                }
            },
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
                !this.$v.phone.lengthCheck && errors.push('Phone number should be 11 digits.');
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
                phone: '',
                email: null,
                facebook: null,
                website: null,

                registerError: null,
            }
        },
        methods: {
            registerClicked() {
                this.registerError = null;

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

                let data = {
                    orgName: this.name,
                    description: this.description,
                    phones: ['+88' + this.phone],
                    email: this.email,
                    facebook: this.facebook,
                    website: this.website
                };

                console.log('DATA: ', data);

                this.requestCompleted = false;
                this.registerLoaderFlag = true;
                axios.post('/api/register', data)
                    .then((res) => {
                        console.log("RESPONSE: ", res);
                        this.requestCompleted = true;
                    }).catch(e => {
                        this.registerError = this.$errorMessage(e);
                    // console.log('ERROR: ', e);
                    // console.log('ERROR.RESPONSE: ', e.response);
                    // if (e.response && e.response.data && e.response.data.message) {
                    //     this.registerError = e.response.data.message;
                    // } else {
                    //     this.registerError = "ERROR"
                    // }
                }).finally(() => {
                    console.log('FINISH');
                    this.registerLoaderFlag = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>