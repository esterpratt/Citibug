import locService from './services/locService.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/main.scss'
import './registerServiceWorker'
// import axios from 'axios'
// tell axios to always send the sessionId cookie in AJAX requests
// axios.defaults.withCredentials = true

import * as moment from 'moment'

Vue.config.productionTip = false

// sockets
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
    debug: true,
    connection: (process.env.NODE_ENV !== 'development') ? '' : '//localhost:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))

// vue-cmps imports
import vueCarousel from 'vue-carousel'
Vue.use(vueCarousel)

import Element from 'element-ui'
Vue.use(Element)

// google-map import
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: locService.getApiKey(),
    libraries: 'places',
  },
})

Vue.filter('relativeTime', (time) => {
  return moment(time).fromNow()
})

Vue.filter('formattedTime', (time) => {
  return moment(time).format('MMMM Do YYYY, h:mm:ss a');
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
