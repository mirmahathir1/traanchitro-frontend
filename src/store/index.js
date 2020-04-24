import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dragZoomNotifier: true,

    token:null,

    filters : {
      typeOfRelief: [],
      schedule: null,
      orgName: null,
    },

    organizations: [],
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
  },
  actions: {
  },
  modules: {
  },
  getters: {
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
    }
  }
})
