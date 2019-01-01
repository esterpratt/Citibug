'use strict';

const mongoService = require('./mongo-service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    // add
}

function query(issueId) {
    // issueId = new ObjectId(issueId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('comment');
            return issueCollection.find({ issueId: issueId }).sort({at : -1}).toArray()
        })
}