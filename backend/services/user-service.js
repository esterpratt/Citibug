'use strict';

const mongoService = require('./mongo-service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    checkLogin,
    add,
}

function checkLogin(user) {
    return mongoService.connectToDB()
    .then(dbConn => {
        const userCollection = dbConn.collection('user');
        return userCollection.findOne({$and: [{name: user.name}, {pass: user.pass}]})
    })
}

function add(user) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.insertOne(user)
        })
}