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
    const categoriesCount = 5;
    var findFilters = [];
    
    var sortObj = {createdAt: -1};
    var findFunc = (issueCollection) => {
        return issueCollection.find({ $and: findFilters }).limit(+filter.to).sort(sortObj).toArray()
    }
    // if to filter by user
    if (filter.byUser) {
        findFilters.push({ownerId: filter.byUser})
    } else {
        // add filters options
        findFilters.push({ title: { $regex: `.*${filter.byTxt}.*`, $options: 'i'}})
        if (filter.byStatus !== 'All') {
            if (filter.byStatus === 'Open') {
                findFilters.push({isResolved : false})
            } else {
                findFilters.push({isResolved : true})
            }
        }
        // if only some of the categories were chosen
        var byCategory = filter.byCategory.split(',')
        if (byCategory[0] && byCategory.length < categoriesCount) { 
            findFilters.push({category : { $in : byCategory}})
        }

        switch(filter.sortBy) {
            case('Distance'):
                findFunc = (issueCollection) => {
                    return issueCollection.aggregate([
                        {
                        $geoNear: {
                            near: { 
                                type: "Point", 
                                coordinates: [+filter.lng , +filter.lat] 
                            },
                            distanceField: "dist.calculated",
                            spherical: true,
                            query: {$and: findFilters}
                        }
                    }]).limit(+filter.to).toArray()
                }
            break;
            case('Attention'):
                sortObj = {commentsCount: -1}
                break;
            case('Oldest first'):
                sortObj = {createdAt: 1}
                break;
            case('Recent first'):
                sortObj = {createdAt: -1}
                break;
            case('Severity'):
                sortObj = {severity: -1}
                break;
        }
    }

    return mongoService.connectToDB()
        .then(dbConn => {
            const issueCollection = dbConn.collection('issue');
            return findFunc(issueCollection)
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