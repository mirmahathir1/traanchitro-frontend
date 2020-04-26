<template>
    <div>
    <v-card
            class="mx-auto secondary lighten-4 text-center"
            max-width="344"
            outlined
            :elevation="12"
    >
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">Organizations</v-list-item-title>
                <v-divider></v-divider>
                <v-autocomplete
                        v-model="selectedOrganization"
                        :loading="organizationLoaderFlag"
                        :items="organizations"
                        :search-input.sync="select"
                        cache-items
                        :disabled="organizationLoaderFlag"
                        flat
                        hide-no-data
                        hide-details
                        :label="organizationLoaderFlag?'Loading Names of organizations...':'Type name of organization:' "
                ></v-autocomplete>
                <v-btn text class="primary lighten-3 mt-3" dark rounded :loading="searchLoaderFlag" :disabled="organizationLoaderFlag" @click="searchClicked">Search</v-btn>

            </v-list-item-content>
        </v-list-item>
    </v-card>

        <v-card
                class="mx-auto white pa-4 mt-5"
                outlined
                :elevation="2"
                style="width: 90vw"
                v-if="detailsLoadedFlag"
        >
            <v-list-item three-line class="text-center">
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{organization.orgName}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
<!--            <v-card-text>-->
<!--                The World Health Organization (WHO) is a specialized agency of the United Nations responsible for international public health. The WHO Constitution, which establishes the agency's governing structure and principles, states its main objective as ensuring "the attainment by all peoples of the highest possible level of health." It is headquartered in Geneva, Switzerland, with six semi-autonomous regional offices and 150 field offices worldwide.-->
<!--            </v-card-text>-->
            <v-card-text>
                {{organization.description}}
            </v-card-text>

            <v-card-actions>
                    <v-btn class="blue-grey" dark>Donate</v-btn>
                    <v-btn class="blue-grey" dark>Website</v-btn>
                    <v-btn class="blue-grey" dark>Facebook</v-btn>
            </v-card-actions>

            <v-card-text>
                Phone: +blahblahblah
            </v-card-text>
            <v-card-text>
                Email: blahblah@blah.blha
            </v-card-text>

            <v-card-title>Relief Records: </v-card-title>


            <v-expansion-panels
                    :accordion="false"
                    :popout="true"
                    :inset="false"
                    :multiple="false"
                    :focusable="true"
                    :disabled="false"
                    :readonly="false"
                    :flat="false"
                    :hover="false"
                    :tile="false"
            >
                <v-expansion-panel
                        v-for="(activity,index) in activities"
                        :key="index"
                >
                    <v-expansion-panel-header>
<!--                        <p>Location: Uttara, Dhaka</p>-->
                        <p>Relief Type: <span v-for="(type,index) in activity.typeOfRelief" :key="index">{{type}} </span></p>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-3">
                        <p><b>Supply Date:</b></p>
                        <p> {{new Date(activity.supplyDate).toDateString()}}</p>
                        <p><b>Contents:</b></p>
                        <p> blah blah blah blah blah blah blah blah blah blah blah blah</p>
<!--                        <v-simple-table>-->

<!--                            <thead>-->
<!--                            <tr>-->
<!--                                <th class="text-left">Item</th>-->
<!--                                <th class="text-left">Quantity</th>-->
<!--                                <th class="text-left">Description</th>-->
<!--                            </tr>-->
<!--                            </thead>-->
<!--                            <tbody>-->
<!--                            <tr v-for="(relief,index) in reliefs" :key="index">-->
<!--                                <td>{{ relief.item }}</td>-->
<!--                                <td>{{ relief.quantity }}</td>-->
<!--                                <td>{{ relief.description }}</td>-->
<!--                            </tr>-->
<!--                            </tbody>-->
<!--                        </v-simple-table>-->
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </div>
</template>

<script>

    import axios from "axios";

    export default {
        name: "Organization",
        data:()=>{
            return{
                detailsLoadedFlag: false,
                searchLoaderFlag: false,
                organizationLoaderFlag: false,

                organizations: [],
                selectedOrganization: null,
                select: "",

                reliefs:[],

                organization: null,
                activities: []
            }
        },
        components:{

        },

        created() {
            this.organizations=this.$store.getters.getOrganizations;
            //console.log('amount of organizations: ',this.$store.getters.getOrganizations)

            if(this.organizations.length===0) {
                let params = {};

                let headers = {
                    'x-auth': localStorage.getItem('x-auth'),
                };

                if(headers["x-auth"]){
                    console.log("USER IS AUTHORIZED");
                }else{
                    console.log("USER IS NOT AUTHORIZED");
                }

                this.organizationLoaderFlag=true;
                axios.get('/api/orgs',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res)=>{
                        console.log('received organization names: ',res.data.orgNames);
                        this.$store.commit('setOrganizations',res.data.orgNames);
                        this.organizations=this.$store.getters.getOrganizations;
                    }).catch(e=>{
                    console.log('error');
                }).finally(()=>{
                    console.log('Organizations loaded finished');
                    this.organizationLoaderFlag=false;
                });
            }
        },
        methods: {
            searchClicked(){
                console.log('selected organization: ',this.selectedOrganization);
                this.searchLoaderFlag=true;
                this.detailsLoadedFlag=false;


                let params = {
                    orgName: this.selectedOrganization,
                };
                let headers = {
                    'x-auth': localStorage.getItem('x-auth'),
                };

                console.log('params: ', params);

                if(headers["x-auth"]){
                    console.log("USER IS AUTHORIZED");
                }else{
                    console.log("USER IS NOT AUTHORIZED");
                }

                axios.get('/api/orgdetails',
                    {
                        headers: headers,
                        params: params
                    })
                    .then((res) => {
                        //console.log('received orgdetails: ',res);
                        this.organization = res.data.organization;
                        this.activities = res.data.activities;

                        console.log('organization: ',this.organization );
                        console.log('activities: ', this.activities);
                    }).catch(e => {
                    console.log(e.response);
                    //console.log('error');
                }).finally(() => {
                    console.log('finished');
                    this.searchLoaderFlag=false;
                    this.detailsLoadedFlag=true;
                });

                // setTimeout(()=>{
                //     this.reliefs=[
                //         {item: "Rice", quantity: "100kg", description: "Imported from Lalbagh"},
                //         {item: "Vegetables", quantity: "50kg", description: "From Vikrampur"},
                //         {item: "Beaf", quantity: "20kg", description: "Cattle Meat"},
                //         {item: "Chicken", quantity: "50kg", description: "Deshi"},
                //         {item: "Carrots", quantity: "20kg", description: "Ripe"},
                //         {item: "Potato", quantity: "100kg", description: "Old Potatoes"},
                //         {item: "Spice", quantity: "10kg", description: "Gol morich"},
                //     ];
                //
                //     this.searchLoaderFlag=false;
                //     this.detailsLoadedFlag=true;
                //
                // },3000);
            }
        }
    }
</script>

<style scoped>

</style>