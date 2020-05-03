import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios';
import store from './store'
import Vuelidate from "vuelidate";
//import './registerServiceWorker'

Vue.use(Vuelidate);

//axios.defaults.baseURL="https://stormy-lake-20015.herokuapp.com";
//axios.defaults.baseURL="https://protean-smile-275412.el.r.appspot.com";
//axios.defaults.baseURL="http://localhost:5000";

axios.defaults.baseURL="https://www.traanchitro.com";
//axios.defaults.baseURL="https://beta-test-v2-dot-protean-smile-275412.el.r.appspot.com";


Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');


