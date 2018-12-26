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
    // return the 1st issue (for now)
    return Promise.resolve(issues[0]);
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
        title: 'a lot a lot a lot of garbage on the street',
        description: 'garbage is thrown all over the street!',
        category: 'sanitation',
        createdAt: Date.now(),
        severity: 3.3,
        seenCount: 12,
        shareCount: 2,
        isResolved: false,
        location: {
            pos: {
                lat: 32.0853,
                lng: 34.7818
            },
            address: 'Ben Yehuda 85',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544712287/udiihqmvei1gmmqagldh.jpg',
        ownerId: 'xyz',
        comments: [{txt: 'Im coming to help', ownerId: 'xyz', at: Date.now()}, 
                   {txt: 'dont come the issue is resolved', ownerId: 'wxy', at: Date.now()},
                   {txt: 'ok thanks', ownerId: 'xyz', at: Date.now()}, 
                  ]
    },
    {
        _id: 'bcd',
        title: 'Turtle crossing the street',
        description: 'garbage is thrown all over the street!',
        category: 'sanitation',
        createdAt: Date.now(),
        severity: 5.3,
        seenCount: 1,
        shareCount: 1,
        isResolved: false,
        location: {
            pos: {
                lat: 32.0853,
                lng: 34.7818
            },
            address: 'Ben Yehuda 85',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544712287/udiihqmvei1gmmqagldh.jpg',
        ownerId: 'xyz',
        comments: [{txt: 'Im coming to help', ownerId: 'xyz', at: Date.now()}, 
                   {txt: 'dont come the issue is resolved', ownerId: 'wxy', at: Date.now()},
                   {txt: 'ok thanks', ownerId: 'xyz', at: Date.now()},
                   {txt: 'not coming', ownerId: 'xyz', at: Date.now()},
                  ]
    },
    {
        _id: 'cde',
        title: 'Milk spilled from truck',
        description: 'garbage is thrown all over the street!',
        category: 'construction',
        createdAt: Date.now(),
        severity: 8.3,
        seenCount: 212,
        shareCount: 10,
        isResolved: false,
        location: {
            pos: {
                lat: 32.0853,
                lng: 34.7818
            },
            address: 'Ben Yehuda 85',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544971934/xmk5xhgjjstg2fwuqrv9.jpg',
        ownerId: 'xyz',
        comments: [{txt: 'Im coming to help', ownerId: 'xyz', at: Date.now()}, 
                   {txt: 'dont come the issue is resolved', ownerId: 'wxy', at: Date.now()},
                   {txt: 'ok thanks', ownerId: 'xyz', at: Date.now()}, 
                  ]
    },
    {
        _id: 'efg',
        title: 'Dead flowers at old lady\'s garden',
        description: 'garbage is thrown all over the street!',
        category: 'landscape',
        createdAt: Date.now(),
        severity: 7.3,
        seenCount: 5,
        shareCount: 0,
        isResolved: false,
        location: {
            pos: {
                lat: 32.0853,
                lng: 34.7818
            },
            address: 'Ben Yehuda 85',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544971843/osesasyy4cr40lqb91yc.jpg',
        ownerId: 'xyz',
        comments: []
    },
    {
        _id: 'fgh',
        title: 'Turtle crossing the street',
        description: 'garbage is thrown all over the street!',
        category: 'animals',
        createdAt: Date.now(),
        severity: 1.3,
        seenCount: 12,
        shareCount: 22,
        isResolved: true,
        location: {
            pos: {
                lat: 32.0853,
                lng: 34.7818
            },
            address: 'Ben Yehuda 85',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544712287/udiihqmvei1gmmqagldh.jpg',
        ownerId: 'xyz',
        comments: [{txt: 'Im coming to help', ownerId: 'xyz', at: Date.now()}, 
                   {txt: 'dont come the issue is resolved', ownerId: 'xyz', at: Date.now()},
                  ]
    },
    {
        _id: 'ghi',
        title: 'garbage on the street',
        description: 'garbage is thrown all over the street!',
        category: 'traffic & walkways',
        createdAt: Date.now(),
        severity: 9.3,
        seenCount: 1,
        shareCount: 6,
        isResolved: true,
        location: {
            pos: {
                lat: 32.0853,
                lng: 34.7818
            },
            address: 'Ben Yehuda 85',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1544971647/sktpnz4y5v5gph2cml13.jpg',
        ownerId: 'xyz',
        comments: [{txt: '1.5 meters left', ownerId: 'xyz', at: Date.now()},]
    },
]