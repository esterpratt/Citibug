import issueService from '@/services/issueService'
import locService from '@/services/locService'

export default {
    state: {
        issues: [],
        issueCategories: ['Animals', 'Landscape', 'Sanitation', 
                          'Construction', 'Traffic & walkways'],
        filter: {
          lat: null,
          lng: null,
          byUser: '',
          // could be: distance, severity, time, attention
          sortBy: 'Distance',
          byTxt: '',
          // could be: open, resolved, all
          byStatus: 'All',
          from: 0,
          to: 18,
          byCategory: []
        },
      },
    
      getters: {
        issues(state) {
          return state.issues
        },

        issueCategories(state) {
          return state.issueCategories
        },
      },
    
      mutations: {
        setIssues(state, {issues}) {
          state.issues = issues
        },

        setFilterKey(state, {key, value}) {
          state.filter[key] = value
        }
      },
    
      actions: {
        setFilter({commit, dispatch}, {filter}) {
          Object.keys(filter).forEach(key => {
            commit({type: 'setFilterKey', key, value: filter[key]})
          })
          return dispatch({type: 'getIssues'})
        },

        getIssues({commit, state}) {
          return issueService.query(state.filter)
          .then(issues => {
            commit({type: 'setIssues', issues})
            return issues
          })
        },
        
        getIssueById(context, {issueId}) {
          return issueService.getIssueById(issueId)
        },

        saveIssue(context, {issue}) {
          return issueService.saveIssue(issue, context.rootState.userModule.loggedinUser)
            .then(issue => issue)
        },

        removeIssue(context, {issueId}) {
          return issueService.removeIssue(issueId)
            .then(res => res)
        },

        getLoc({commit, dispatch}) {
          return locService.getCurrLoc()
            .then(coords => {
              commit({type: 'setFilterKey', key: 'lng', value: coords[0]})
              commit({type: 'setFilterKey', key: 'lat', value: coords[1]})
              return dispatch({type: 'getAddressByCoords', coords})
                .then(address => {
                  return {coords, address}
                })
            })
            .catch(err => {
              // TODO: decide what to do when refuse to give location:
              //       1. set default location?
              //       2. remove issues by distance?
              console.log("catch location refuse");
            })
        },

        getCoordsByAddress(context, {address}) {
          return locService.getCoordsByAddress(address)
            .then(coords => {
              return coords
            })
        },

        getAddressByCoords(context, {coords}) {
          return locService.getAddressByCoords(coords)
            .then(address => {
              return address
            })
        },

        // Sockets
        // SOCKET_addNewComment(context, comment) {
        // }
      }
}