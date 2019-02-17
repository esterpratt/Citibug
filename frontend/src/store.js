import Vue from 'vue'
import Vuex from 'vuex'
import issueModule from '@/modules/issueModule'
import userModule from '@/modules/userModule'
import mailModule from '@/modules/mailModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    issueModule,
    userModule,
    mailModule
  },
})
