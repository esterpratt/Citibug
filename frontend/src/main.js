import locService from './services/locService.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/main.scss'
import './registerServiceWorker'
import axios from 'axios'
// tell axios to always send the sessionId cookie in AJAX requests
axios.defaults.withCredentials = true;

import * as moment from 'moment'

Vue.config.productionTip = false

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
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

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
