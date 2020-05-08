import Vue from 'vue'
import Vuex from 'vuex'

import maps from './modules/maps'
import snackbar from "./modules/snackbar";
import auth from "./modules/auth";
import filters from "./modules/filters";
import newReliefLocation from "./modules/newReliefLocation"
import organizations from "./modules/organizations";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    maps,
    snackbar,
    auth,
    filters,
    newReliefLocation,
    organizations,
    //dummy
  },
})
