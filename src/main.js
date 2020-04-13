import Vue from 'vue';
// import VueRouter from 'vue-router';
import App from './App.vue'
import router from './router/kvue-router'
// import Vuex from 'vuex';
import kstore from './store/kindex';

Vue.config.productionTip = false
// Vue.use(VueRouter);
// Vue.use(Vuex);
new Vue({
  router,
  store: kstore,
  render: h => h(App),
}).$mount('#app')
