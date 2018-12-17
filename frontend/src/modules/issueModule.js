import issueService from '@/services/issueService'
import locService from '@/services/locService'

export default {
    state: {
        issues: [],
        filter: {
          // update loc when loading issues
          loc: {},
          // could be: distance, severity, time, attention
          sortBy: '',
          sortDir: 1,
          byTxt: '',
          // could be: open, resolved, all
          byStatus: 'all',
        },
      },
    
      getters: {
        issues(state) {
          return state.issues
        },

        loc(state) {
          return state.filter.loc
        }
      },
    
      mutations: {
        setIssues(state, {issues}) {
          state.issues = issues;
        },

        setLoc(state, {loc}) {
          state.filter.loc = loc;
        },
      },
    
      actions: {
        getLoc({commit}) {
          return locService.getCurrLoc()
            .then(loc => {
              commit({type: 'setLoc', loc})
              // return loc
            })
        },

        getIssues({commit, state}) {
          issueService.query(state.filter)
            .then(issues => {
                commit({type: 'setIssues', issues})
              })
        },
        
      }
}