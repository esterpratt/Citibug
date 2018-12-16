import issueService from '@/services/issueService'

export default {
    state: {
        issues: [],
        filter: {
          // to update loc when loading app
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
      },
    
      mutations: {
        setIssues(state, {issues}) {
            state.issues = issues;
          },
      },
    
      actions: {
        getIssues({commit, state}) {
            issueService.query(state.filter)
                .then(issues => {
                    commit({type: 'setIssues', issues})
                  })
        }
      }
}