import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios';

axios.defaults.baseURL="https://young-refuge-37756.herokuapp.com";
Vue.config.productionTip = false;


export const eventBus = new Vue();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');


