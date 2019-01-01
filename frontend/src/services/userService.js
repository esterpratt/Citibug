'use strict';

import storageService from './storageService.js'
const axios = require('axios')

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : '//localhost:3000';

export default {
    login, 
    logout,
    signup,
    getLoggedinUser
}

function login(user) {
    // send server to check if user exist
    return axios.put(`${BASE_URL}/login`, user)
        .then(res => {
            const user = res.data
            if (user) return user
            else throw new Error('Username or password are wrong')
        })
}

function logout() {
    // send server to remove user saved on session
    return axios.delete(`${BASE_URL}/logout`)
        .then(res => res.data)
    // return Promise.resolve('removed')
}

function signup(user) {
    // add user to collection
    return axios.post(`${BASE_URL}/signup`, user)
        .then(res => res.data)
}

function getLoggedinUser() {
    return Promise.resolve(storageService.load('user'))
}

