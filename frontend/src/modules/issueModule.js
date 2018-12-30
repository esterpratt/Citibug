import issueService from '@/services/issueService'
import locService from '@/services/locService'

export default {
    state: {
        issues: [],
        issueCategories: ['Animals', 'Landscape', 'Sanitation', 
                          'Construction', 'Traffic & walkways'],
        filter: {
          // update loc when loading issues
          pos: {},
          // could be: distance, severity, time, attention
          sortBy: '',
          sortDir: 1,
          byTxt: '',
          // could be: open, resolved, all
          byStatus: 'all',
          byCategory: 'all',
        },
      },
    
      getters: {
        issues(state) {
          return state.issues
        },

        issueCategories(state) {
          return state.issueCategories
        },

        loc(state) {
          return state.filter.pos
        }
      },
    
      mutations: {
        setIssues(state, {issues}) {
          state.issues = issues
        },

        setPos(state, {pos}) {
          state.filter.pos = pos
        },
      },
    
      actions: {       
        getIssues({commit, state}) {
          issueService.query(state.filter)
          .then(issues => {
            commit({type: 'setIssues', issues})
          })
        },

        getIssuesByUser({commit}) {
          issueService.getIssuesByUser()
          .then(issues => {
            commit({type: 'setIssues', issues})
          })
        },
        
        getIssueById(context, {issueId}) {
          return issueService.getIssueById(issueId)
        },

        getLoc({commit, dispatch}) {
          return locService.getCurrLoc()
            .then(pos => {
              commit({type: 'setPos', pos})
              return dispatch({type: 'getAddressByPos', pos})
                .then(address => {
                  return {pos, address}
                })
            })
        },

        getPosByAddress(context, {address}) {
          return locService.getPosByAddress(address)
            .then(pos => {
              return pos
            })
        },

        getAddressByPos(context, {pos}) {
          return locService.getAddressByPos(pos)
            .then(address => {
              return address
            })
        }
      }
}