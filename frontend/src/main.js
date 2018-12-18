import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/main.scss'
import './registerServiceWorker'
import * as moment from 'moment'

Vue.config.productionTip = false

// vue-cmps imports
import vueCarousel from 'vue-carousel'
Vue.use(vueCarousel)

import Element from 'element-ui'
Vue.use(Element)

Vue.filter('relativeTime', (time) => {
  return moment(time).fromNow()
})

Vue.mixin({
  methods: {
    getSeverityStatus(severity) {
      if (severity < 4) {
        return 'casual'
      } else if (severity < 7) {
          return 'important'
      } else {
          return 'urgent'
      }
    },
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
