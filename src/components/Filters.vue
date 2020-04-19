<template>
    <div class="text-center">
        <v-menu v-model="menu"
                :close-on-content-click="false"
                :nudge-width="400"
                offset-x
        >
            <template v-slot:activator="{on}">
                <v-btn large class="primary darken-2" v-on="on" dark>Filter</v-btn>
            </template>
            <v-card>
                <v-card-title>Filter Search</v-card-title>
                <v-divider></v-divider>

                <v-container>
                    <v-row no-gutters>
                        <v-col
                                :cols="4"
                        >
                            <p>Type of Relief:</p>
                            <v-checkbox v-model="foodChecked" label="Food"></v-checkbox>
                            <v-checkbox v-model="sanitizerChecked" label="Sanitizer"></v-checkbox>
                            <v-checkbox v-model="ppeChecked" label="PPE"></v-checkbox>
                        </v-col>
                        <v-col
                                :cols="8"
                        >
                            <p>Filter by Organization:</p>
                            <v-select
                                    :items="Organizations"
                                    label="Select Organization"
                                    outlined
                            ></v-select>

                            <p>Schedule:</p>
                            <v-radio-group v-model="Schedule">
                                <v-radio
                                        :label="'Past Delivery'"
                                        :value="1"
                                ></v-radio>
                                <v-radio
                                        :label="'Scheduled Delivery'"
                                        :value="2"
                                ></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-container>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="menu = false">Close</v-btn>
                    <v-btn color="primary" text @click="filterSearch" :loading="filterSearchLoadingFlag">Search</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: "Filters",
        data:()=>{
            return{
                menu: false,
                foodChecked:false,
                ppeChecked:false,
                sanitizerChecked:false,
                Schedule: 1,
                Organizations: ['WHO', 'Badhan', 'Biddananda', 'BUET','Dhaka University', 'Tran Somiti', 'Home Ministry', 'Ministry of Health','Dhaka Metropolitan Police', 'RAB', 'Notre Dame College', 'Richshaw Somiti','10 Minute School', 'Prothom-Alo', 'Kaler Kantha'],

                filterSearchLoadingFlag: false,
            }
        },
        methods:{
            filterSearch(){
                console.log("Filter Search Enabled");

                this.filterSearchLoadingFlag=true;
                setTimeout(()=>{

                    this.menu=false;
                    this.filterSearchLoadingFlag=false;
                },2000);
            }
        }
    }
</script>

<style scoped>

</style>