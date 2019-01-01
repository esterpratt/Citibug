'use strict';

const mongoService = require('./mongo-service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    checkLogin,
    add,
    getById
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

function getById(userId) {
    userId = new ObjectId(userId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.findOne({_id : userId}, { projection : { pass: 0 } });
        })
}