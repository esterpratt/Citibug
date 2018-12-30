'use strict';

const mongoService = require('./mongo-service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

function query(filter) {
    // const byStatus = filter.inStock
    // const byName = filter.name
    // const byType = filter.type
    // const sortParams = filter.sortBy.split('_')
    // const sortObj = { [sortParams[0]]: +sortParams[1] }
    // const findFilters = [{ name: { $regex: `.*${byName}.*` } }]
    // if (byStatus !== 'all') {
    //     if (byStatus === 'inStock') findFilters.push({ inStock: true })
    //     else findFilters.push({ inStock: false })
    // }
    // if (byType !== 'all') {
    //     findFilters.push({ type: byType })
    // }
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('issue');
            return issueCollection.find().toArray()
            // return issueCollection.find({ $and: findFilters }).sort(sortObj).toArray()
        })
}

function getById(issueId) {
    issueId = new ObjectId(issueId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('issue');
            return issueCollection.findOne({ _id: issueId })
        })
}

function remove(issueId) {
    issueId = new ObjectId(issueId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('issue');
            return issueCollection.remove({ _id: issueId })
        })
}

function update(issue) {
    const issueId = new ObjectId(issue._id)
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('issue');
            return issueCollection.updateOne({ _id: issueId },
                // TODO: update only relevant fields!
                { $set: { name: issue.name, price: issue.price } })
        })
}

function add(issue) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('issue');
            return issueCollection.insertOne(issue)
        })
}