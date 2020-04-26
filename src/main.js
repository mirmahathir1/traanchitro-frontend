import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios';
import store from './store'
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
axios.defaults.baseURL="https://stormy-lake-20015.herokuapp.com";

//axios.defaults.baseURL="http://localhost:5000";

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');


