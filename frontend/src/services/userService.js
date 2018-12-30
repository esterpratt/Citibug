'use strict';

const axios = require('axios')

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : '//localhost:3000';

export default {
    login, 
    logout,
    signup,
    getUsersByIssue,
    checkOwnerByIssue,
    getLoggedInUser
}

function login(user) {
    // send server to check if user exist 
    // if so, saved it on session and return an answer
    // so store will change isUserLoggedin to true
    console.log(user);
    return Promise.resolve('saved')
}

function logout() {
    // remove user saved on session
    return Promise.resolve('removed')
}

function signup(user) {
    // add user to collection
    console.log(user);
    return Promise.resolve('signout')
}

function getUsersByIssue(issueId) {
    // get users name and emoji by issue comments ownerid
}

function checkOwnerByIssue(issueId) {
    // check if issue owner is the user logged in
}

function getLoggedInUser() {
    // check if user is saved on session
    // if so, return its name and emoji
    return Promise.resolve({name: 'shula', emoji: '👳'})
}