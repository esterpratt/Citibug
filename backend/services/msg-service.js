'use strict';

const mongoService = require('./mongo-service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    add
}

function query(userId) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('message');
            return issueCollection.aggregate([
                {
                    $match: { ownerId: userId }
                },
                {
                    $lookup:
                    {
                        from: 'issue',
                        localField: 'issueId',
                        foreignField: '_id',
                        as: 'issue',
                    },
                },
                {
                    $lookup:
                    {
                        from: 'user',
                        localField: 'from',
                        foreignField: '_id',
                        as: 'from',
                    },
                },
                {
                    $project: 
                    { 
                        "type": 1,
                        "at": 1,
                        "issue._id" : 1,
                        "issue.title" : 1,
                        "from.name": 1,
                    }
                }
            ]).sort({at : -1}).toArray()
        })
}

function add(msg) {
    msg.issueId = new ObjectId(msg.issueId)
    msg.from = (msg.from) ? new ObjectId(msg.from) : ''
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('message');
            return issueCollection.insertOne(msg)
        })
}