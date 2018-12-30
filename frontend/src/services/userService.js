'use strict';

const axios = require('axios')

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : '//localhost:3000';

export default {
    login, 
    logout,
    signup,
    // getUsersByIssue,
    checkOwnerByIssue,
    getLoggedInUser
}

function login(user) {
    // send server to check if user exist 
    // if so, saved it on session and return an answer
    // so store will change isUserLoggedin to true
    return axios.put(`${BASE_URL}/login`, user)
        .then(res => {
            const user = res.data
            if (user) return user
            else throw new Error('not a valid user')
        })
    // return Promise.resolve('saved')
}

function logout() {
    // remove user saved on session
    return Promise.resolve('removed')
}

function signup(user) {
    // add user to collection
    return axios.post(`${BASE_URL}/signup`, user)
        .then(res => res.data)
}

// function getUsersByIssue(issueId) {
//     // get users name and emoji by issue comments ownerid
// }

function checkOwnerByIssue(issueId) {
    // check if issue owner is the user logged in
}

function getLoggedInUser() {
    // check if user is saved on session
    // if so, return its name and emoji
    return Promise.resolve({name: 'shula', emoji: '👳'})
}



// TO DELETE
var users = [
    {
        name: 'shula',
        pass: 's123',
        emoji: '👵'
    },
    {
        name: 'shalom',
        pass: 's234',
        emoji: '🧑'
    },
    {
        name: 'garfield',
        pass: 'g345',
        emoji: '😺'
    },
    {
        name: 'abed',
        pass: 'a456',
        emoji: '👳'
    },
    {
        name: 'lili',
        pass: 'l567',
        emoji: '👧🏿'
    },
]

