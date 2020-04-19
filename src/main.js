import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios';
import store from './store'

//axios.defaults.baseURL="https://young-refuge-37756.herokuapp.com";
Vue.config.productionTip = false;


export const eventBus = new Vue();

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');


