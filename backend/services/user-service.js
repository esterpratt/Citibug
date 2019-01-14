'use strict';

const mongoService = require('./mongo-service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    checkLogin,
    add,
    getById,
    updateMsgCount
}

function checkLogin(user) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.findOne({ $and: [{ name: user.name }, { pass: user.pass }] })
        })
}

function add(user) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.insertOne(user)
                .then(res => {
                    user._id = res.insertedId
                    return user
                })
        })
}

function getById(userId) {
    if (userId) {
        userId = new ObjectId(userId)
        return mongoService.connectToDB()
            .then(dbConn => {
                const userCollection = dbConn.collection('user');
                return userCollection.findOne({ _id: userId }, { projection: { pass: 0 } });
            })
    } else {
        return Promise.resolve({ name: 'guest', emoji: '?' })
    }
}

function updateMsgCount(userId, isReset) {
    userId = new ObjectId(userId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('user');
            if (isReset) {
                return issueCollection.updateOne({ _id: userId },
                    { $set: { msgCount: 0 } })
            } else {
                return issueCollection.updateOne({ _id: userId },
                    { $inc: { msgCount: 1 } })
            }
        })
}