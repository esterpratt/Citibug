import Vue from 'vue'
import Vuex from 'vuex'
import issueModule from '@/modules/issueModule'
import userModule from '@/modules/userModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    issueModule,
    userModule
  },
})
