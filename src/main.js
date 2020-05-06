import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios';
import store from './store'
import Vuelidate from "vuelidate";
import MyMixins from './mixins/index';


Vue.mixin(MyMixins);

Vue.use(Vuelidate);

axios.defaults.baseURL="https://protean-smile-275412.el.r.appspot.com/";

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');


