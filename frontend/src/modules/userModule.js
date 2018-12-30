import userService from '@/services/userService'

export default {
    state: {
        isUserLoggedin: false,
      },
    
      getters: {
        isUserLoggedin(state) {
            return state.isUserLoggedin
        }
      },
    
      mutations: {
        setIsUserLoggedin(state, {isUser}) {
            state.isUserLoggedin = isUser
        }
      },
    
      actions: {
        login({commit}, {user}) {
            return userService.login(user)
            .then(_ => commit({type: 'setIsUserLoggedin', isUser: true}))
            .catch(err => {
                console.log('not valid')
                // tell login-cmp user/pass is wrong
                throw new Error('Username or password are wrong')
            }) 
        },

        signup({commit}, {user}) {
            userService.signup(user)
            .then(_ => commit({type: 'setIsUserLoggedin', isUser: true}))
        },
        
        logout({commit}) {
            userService.logout()
            .then(_ => commit({type: 'setIsUserLoggedin', isUser: false}))
        },

        getLoggedInUser({commit}) {
            return userService.getLoggedInUser()
                .then(user => {
                    if (user) {
                        commit({type: 'setIsUserLoggedin', isUser: true})
                        return user
                    }
                })
        },
        }
}