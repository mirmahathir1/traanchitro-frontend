<template>
  <v-app id="inspire">
    <SideDrawer></SideDrawer>
    <TopBar></TopBar>
    <v-content app class="backimage">
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import Map from "./components/Map";
  import TopBar from "./components/TopBar";
  import SideDrawer from "./components/SideDrawer";
  import axios from "axios";
  export default {
    props: {
      source: String,
    },
    components:{
      Map,
      SideDrawer,
      TopBar
    },
    data: () => ({
     }),
    mounted() {
      this.getOrganizations();
    },
    methods:{
      getOrganizations(){
        //let orgName=['WHO', 'Badhan', 'Biddananda', 'BUET','Dhaka University', 'Tran Somiti', 'Home Ministry', 'Ministry of Health','Dhaka Metropolitan Police', 'RAB', 'Notre Dame College', 'Richshaw Somiti','10 Minute School', 'Prothom-Alo', 'Kaler Kantha'];

        let params = {};

        let headers = {
          TOKEN: this.$store.getters.getToken,
        };

        axios.get('/api/orgs',
                {
                  headers: headers,
                  params: params
                })
                .then((res)=>{
                  console.log('received organization names: ',res.data.orgNames);
                  this.$store.commit('setOrganizations',res.data.orgNames);
                }).catch(e=>{
          console.log('error');
        }).finally(()=>{
          console.log('Organizations loaded finished');
        });

        //this.$store.commit('setOrganizations',orgName);
      }
    }
  }
</script>

<style>
  .backimage{
    background-image: url("assets/landing.jpg");
    background-position: center;
    background-repeat:repeat;
    height: 100%;
    /*background-size:100% 100%;*/
  }
</style>