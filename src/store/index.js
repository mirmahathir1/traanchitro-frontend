import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dragZoomNotifier: true,

    token:null,
  },
  mutations: {
    stopDragZoomNotifier:((state) => {
      state.dragZoomNotifier=false;
    }),
    setToken:((state, token)=>{
      state.token = token;
    })
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
    }
  }
})
