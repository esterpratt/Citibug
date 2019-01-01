import userService from '@/services/userService'
import msgService from '@/services/msgService'
import storageService from '@/services/storageService'

export default {
    state: {
        loggedinUser: null,
        msgs: []
      },
    
      getters: {
        loggedinUser(state) {
            return state.loggedinUser
        },

        msgs(state) {
            return state.msgs
        }
      },
    
      mutations: {
        setLoggedinUser(state, {user}) {
            state.loggedinUser = user
        },

        setMsgs(state, {msgs}) {
            state.msgs = msgs
        }
      },
    
      actions: {
        login({commit}, {user}) {
            return userService.login(user)
            .then(user => {
                // set user to user without password and save to storage
                commit({type: 'setLoggedinUser', user: {_id: user._id, name: user.name, emoji: user.emoji}})
                storageService.store('user', {name: user.name, pass: user.pass})
                return user
            })
            .catch(err => {
                // tell login-cmp user/pass is wrong
                throw new Error(err)
            }) 
        },

        signup({commit}, {user}) {
            userService.signup(user)
            .then(user => {
                // set user to user without password and save to storage
                commit({type: 'setLoggedinUser', user: {_id: user._id, name: user.name, emoji: user.emoji}})
                storageService.store('user', {name: user.name, pass: user.pass})
            })
        },
        
        logout({commit}) {
            userService.logout()
            .then(_ => {
                // set user to null and clear from storage
                commit({type: 'setLoggedinUser', user: null})
                storageService.remove('user')
            })
        },

        getLoggedinUser({dispatch}) {
            // check if exist user in storage. if so - login
            return userService.getLoggedinUser()
                .then(user => {
                    if (user) return dispatch({type: 'login', user})
                        .then(returnedUser => returnedUser)
                    })
        },

        getMsgs({commit, state}) {
            msgService.query(state.loggedinUser._id)
                .then(msgs => {
                    commit({type: 'setMsgs', msgs})
                })
        }
    }
}