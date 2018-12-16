'use strict';

const axios = require('axios')

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : '//localhost:3000';

export default {
    query,
    removeIssue,
    getIssueById,
    saveIssue,
}

function query(filter = {}) {
    console.log(filter);
    
    return Promise.resolve(issues);
    // var queryParams  = new URLSearchParams()
    // queryParams.append('inStock', filter.byStatus)
    // queryParams.append('name', filter.byName)
    // queryParams.append('type', filter.byType)
    // queryParams.append('sortBy', filter.sort)
    // return axios.get(`${BASE_URL}/toy?${queryParams}`)
    //     .then(res => res.data)
    //     // .catch(err =>{
    //     //     console.log('ERROR:', err);

    //     // })
}

function getIssueById(issueId) {
    // to return the 1st issue (for now)

    // return axios.get(`${BASE_URL}/issue/${issueId}`)
    //     .then(res => res.data)
}

function removeIssue(issueId) {
    return axios.delete(`${BASE_URL}/issue/${issueId}`)
    // .then(res => res.data)
}

function saveIssue(issue) {
    if (issue._id) {
        return axios.put(`${BASE_URL}/issue/${issue._id}`, issue)
    } else {
        issue.createdAt = Date.now()
        return axios.post(`${BASE_URL}/issue`, issue)
    }
}

var issues = [
    {
        _id: 'abc',
        title: 'garbage on the street',
        description: 'garbage is thrown all over the street!',
        category: 'life quality',
        createdAt: Date.now(),
        severity: 3.3,
        seenCount: 12,
        isResolved: true,
        loc: {
            lat: 10.223333,
            lng: 11.114442
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544712287/udiihqmvei1gmmqagldh.jpg',
        ownerId: 'xyz',
        comments: []
    },
    {
        _id: 'bcd',
        title: 'garbage on the street',
        description: 'garbage is thrown all over the street!',
        category: 'infrastracture',
        createdAt: Date.now(),
        severity: 5.3,
        seenCount: 1,
        isResolved: true,
        loc: {
            lat: 10.223333,
            lng: 11.114442
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544712287/udiihqmvei1gmmqagldh.jpg',
        ownerId: 'xyz',
        comments: []
    },
    {
        _id: 'cde',
        title: 'garbage on the street',
        description: 'garbage is thrown all over the street!',
        category: 'life quality',
        createdAt: Date.now(),
        severity: 8.3,
        seenCount: 212,
        isResolved: true,
        loc: {
            lat: 10.223333,
            lng: 11.114442
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544712287/udiihqmvei1gmmqagldh.jpg',
        ownerId: 'xyz',
        comments: [{txt: 'Im coming to help', ownerId: 'xyz'}, 
                   {txt: 'dont come the issue is resolved', ownerId: 'wxy'},
                   {txt: 'ok thanks', ownerId: 'xyz'}, 
                  ]
    },
    {
        _id: 'efg',
        title: 'garbage on the street',
        description: 'garbage is thrown all over the street!',
        category: 'infrastracture',
        createdAt: Date.now(),
        severity: 7.3,
        seenCount: 5,
        isResolved: true,
        loc: {
            lat: 10.223333,
            lng: 11.114442
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544712287/udiihqmvei1gmmqagldh.jpg',
        ownerId: 'xyz',
        comments: []
    },
    {
        _id: 'fgh',
        title: 'garbage on the street',
        description: 'garbage is thrown all over the street!',
        category: 'life quality',
        createdAt: Date.now(),
        severity: 1.3,
        seenCount: 12,
        isResolved: true,
        loc: {
            lat: 10.223333,
            lng: 11.114442
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544712287/udiihqmvei1gmmqagldh.jpg',
        ownerId: 'xyz',
        comments: [{txt: 'Im coming to help', ownerId: 'xyz'}, 
                   {txt: 'dont come the issue is resolved', ownerId: 'xyz'},
                  ]
    },
    {
        _id: 'ghi',
        title: 'garbage on the street',
        description: 'garbage is thrown all over the street!',
        category: 'infrastracture',
        createdAt: Date.now(),
        severity: 9.3,
        seenCount: 1,
        isResolved: false,
        loc: {
            lat: 10.223333,
            lng: 11.114442
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544712287/udiihqmvei1gmmqagldh.jpg',
        ownerId: 'xyz',
        comments: [{txt: '1.5 meters left', ownerId: 'xyz'},]
    },
]