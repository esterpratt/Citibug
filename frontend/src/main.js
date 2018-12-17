import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/main.scss'
import './registerServiceWorker'
import * as moment from 'moment';

Vue.config.productionTip = false

// vue-cmps imports
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.filter('relativeTime', (time) => {
  return moment(time).fromNow();
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
