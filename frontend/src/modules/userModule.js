import userService from '@/services/userService'
import msgService from '@/services/msgService'
import storageService from '@/services/storageService'
import { vm } from '@/services/socketService'

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
        setLoggedinUser(state, { user }) {
            state.loggedinUser = user
        },

        setMsgs(state, { msgs }) {
            state.msgs = msgs
        }
    },

    actions: {
        login({ commit }, { user }) {
            return userService.login(user)
                .then(user => {
                    // set user to user without password and save to storage
                    commit({
                        type: 'setLoggedinUser', user: {
                            _id: user._id,
                            name: user.name,
                            emoji: user.emoji,
                            msgCount: user.msgCount
                        }
                    })
                    storageService.store('user', { name: user.name, pass: user.pass })
                    vm.$socket.emit('addUser', user._id)
                    return user.name
                })
                .catch(err => {
                    // tell login-cmp user/pass is wrong
                    throw new Error(err)
                })
        },

        signup({ commit }, { user }) {
            user.msgCount = 0
            return userService.signup(user)
                .then(signedUser => {
                    // set user to user without password and save to storage
                    commit({
                        type: 'setLoggedinUser', user: {
                            _id: signedUser._id,
                            name: signedUser.name,
                            emoji: signedUser.emoji,
                            msgCount: signedUser.msgCount
                        }
                    })
                    storageService.store('user', { name: signedUser.name, pass: signedUser.pass })
                    vm.$socket.emit('addUser', signedUser._id)
                    return user.name
                })
                .catch(err => {
                    // tell login-cmp user/pass is wrong
                    throw new Error(err)
                })
        },

        logout({ commit, state }) {
            userService.logout()
                .then(_ => {
                    vm.$socket.emit('removeUser', state.loggedinUser._id)
                    // set user to null and clear from storage
                    commit({ type: 'setLoggedinUser', user: null })
                    storageService.remove('user')
                })
        },

        getLoggedinUser({ dispatch }) {
            // check if exist user in storage. if so - login
            return userService.getLoggedinUser()
                .then(user => {
                    if (user) return dispatch({ type: 'login', user })
                        .then(returnedUser => returnedUser)
                })
        },

        getMsgs({ commit, state }) {
            msgService.query(state.loggedinUser._id)
                .then(msgs => {
                    commit({ type: 'setMsgs', msgs })
                })
        }
    }
}