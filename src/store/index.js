import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //a flag to control the notification in Map.vue
    dragZoomNotifier: true,

    //token for authorized access
    token:null,
    loggedIn: false,

    //filters used in Map.vue
    filters : {
      typeOfRelief: [],
      schedule: null,
      orgName: null,
    },

    //organization list loaded in App.vue
    organizations: [],

    //Forwarded map information from Map.vue to LocationSelector.vue
    newReliefLocation: null,

    //api objects
    maps: null,


  },
  mutations: {
    stopDragZoomNotifier:((state) => {
      state.dragZoomNotifier=false;
    }),
    setToken:((state, token)=>{
      state.token = token;
    }),
    setFilters:((state, filters)=>{
      state.filters = filters;
    }),
    setOrganizations: ((state, organizations)=> {
      state.organizations = organizations;
    }),
    setNewReliefLocation:((state, newReliefLocation)=>{
      state.newReliefLocation = newReliefLocation;
    }),

    logout:((state)=>{
      state.loggedIn=false;
    }),
    login: ((state)=>{
      state.loggedIn=true;
    }),

    setMaps: ((state, maps)=>{
      state.maps = maps;
    })
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getLoggedIn: state=>{
      return state.loggedIn;
    },
    getDragZoomNotifier: state => {
      return state.dragZoomNotifier;
    },
    getToken: state =>{
      return state.token;
    },
    getFilters: state=>{
      return state.filters;
    },
    getOrganizations: state=>{
      return state.organizations;
    },
    getNewReliefLocation: state=>{
      return state.newReliefLocation;
    },
    getMaps: state => {
      return state.maps;
    }
  }
})
