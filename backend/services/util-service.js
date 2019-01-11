'use strict';

const mongoService = require('./mongo-service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    updateField,
    incCount
}

function updateField(collection, docId, field, value) {
    docId = new ObjectId(docId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection(collection);
            return issueCollection.updateOne({ _id: docId },
                // update only relevant field
                { $set: 
                    {[field] : value} 
                })
        })
}

function incCount(collection, docId, field) {
    docId = new ObjectId(docId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection(collection);
            return issueCollection.updateOne({ _id: docId },
                { $inc: {[field] : 1}})
        })
}