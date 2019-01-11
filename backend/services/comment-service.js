'use strict';

const mongoService = require('./mongo-service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    add
}

function query(issueId) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('comment');
            return issueCollection.aggregate([
                {
                    $match: { issueId: issueId }
                },
                {
                    $lookup:
                    {
                        from: 'user',
                        localField: 'ownerId',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $project: 
                    {
                        "user.pass": 0,
                        "user._id": 0,
                        "user.msgCount": 0
                    }
                }
            ]).sort({at : -1}).toArray()
        })
}

function add(comment) {
    comment.ownerId = (comment.ownerId) ? new ObjectId(comment.ownerId) : (comment.ownerId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('comment');
            return issueCollection.insertOne(comment)
        })
}