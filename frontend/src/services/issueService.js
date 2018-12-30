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
    getIssuesByUser
}

function query(filter = {}) {

    // return Promise.resolve(issues);

    // var queryParams  = new URLSearchParams()
    // queryParams.append('inStock', filter.byStatus)
    // queryParams.append('name', filter.byName)
    // queryParams.append('type', filter.byType)
    // queryParams.append('sortBy', filter.sort)
    // return axios.get(`${BASE_URL}/issue?${queryParams}`)
    return axios.get(`${BASE_URL}/issue`)
        .then(res => res.data)
    //     // .catch(err =>{
    //     //     console.log('ERROR:', err);

    //     // })
}

function getIssuesByUser() {
    // check id of logged in user and return the issues he owns
    return Promise.resolve(issues);
}

function getIssueById(issueId) {
    return axios.get(`${BASE_URL}/issue/${issueId}`)
        .then(res => res.data)
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
        // TODO: upload pic to cloudinary (if not the default pic)
        return axios.post(`${BASE_URL}/issue`, issue)
    }
}







// TO DELETE
var issues = [
    {
        _id: 'bcd',
        title: 'Turtle crossing the street',
        description: 'A turtle is crossing the street and creats traffic jam',
        category: 'Animals',
        createdAt: 1546174568296,
        severity: 5.3,
        seenCount: 1,
        shareCount: 1,
        isResolved: false,
        location: {
            pos: {
                lat: 32.049720,
                lng: 34.759140
            },
            address: 'Yehuda Hayamit 6 Tel Aviv',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177621/turtle.jpg',
        ownerId: '5c28d68ce3629fa3c6c86c00',
        comments: [{txt: 'car almost run over it', ownerId: '5c28d68ce3629fa3c6c86c01', at: 1546174568296},
                    {txt: '1.5 meters left', ownerId: '5c28d68ce3629fa3c6c86c00', at: 1546174568296},
                    {txt: 'its in halfway', ownerId: '5c28d68ce3629fa3c6c86c02', at: 1546174568296}]
    },
    {
        _id: 'efg',
        title: 'Dead flowers at old lady\'s garden',
        description: 'can somebody help me plant new flowers for her?',
        category: 'Landscape',
        createdAt: 1546174568296,
        severity: 3.3,
        seenCount: 5,
        shareCount: 0,
        isResolved: false,
        location: {
            pos: {
                lat: 32.097180,
                lng: 34.799220
            },
            address: 'Hamishna 1 Tel Aviv',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177596/flowers.jpg',
        ownerId: '5c28d68ce3629fa3c6c86c01',
        comments: [{txt: 'I know her she is nice, I will come help', ownerId: '5c28d68ce3629fa3c6c86c02', at: 1546174568296},
                    {txt: 'me too', ownerId: '5c28d68ce3629fa3c6c86c03', at: 1546174568296},
                    {txt: 'Thanks! I\'ll bring a shovel', ownerId: '5c28d68ce3629fa3c6c86c01', at: 1546174568296},
                    {txt: 'does she have sun at the garden?', ownerId: '5c28d68ce3629fa3c6c86c03', at: 1546174568296},
                    {txt: 'yes', ownerId: '5c28d68ce3629fa3c6c86c01', at: 1546174568296},
                    {txt: 'than we should plant anemon', ownerId: '5c28d68ce3629fa3c6c86c03', at: 1546174568296}]
    },
    {
        _id: 'fgh',
        title: 'concrete fall from building',
        description: 'pieces of concrete are falling from the 2nd floor',
        category: 'Construction',
        createdAt: 1546174568296,
        severity: 7.3,
        seenCount: 12,
        shareCount: 22,
        isResolved: false,
        location: {
            pos: {
                lat: 32.121380,
                lng: 34.799560
            },
            address: 'Rabina 17 Tel Aviv',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546178242/Concrete.jpg',
        ownerId: '5c28d68ce3629fa3c6c86c02',
        comments: [{txt: 'OMG it almost fell on me!!', ownerId: '5c28d68ce3629fa3c6c86c03', at: 1546174568296}, 
                   {txt: 'It\'s really dangerous, whatch out', ownerId: '5c28d68ce3629fa3c6c86c01', at: 1546174568296},
                  ]
    },
    {
        _id: 'ghi',
        title: 'injured bat',
        description: 'I found an injured bat, what should I do?',
        category: 'Animals',
        createdAt: 1546174568296,
        severity: 9.3,
        seenCount: 1,
        shareCount: 6,
        isResolved: false,
        location: {
            pos: {
                lat: 32.077900,
                lng: 34.775680
            },
            address: 'Zamanhoff 7 Tel Aviv',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177623/bat.jpg',
        ownerId: '5c28d68ce3629fa3c6c86c03',
        comments: [{txt: 'I will take him to hospital, where are you?', ownerId: '5c28d68ce3629fa3c6c86c02', at: 1546174568296},
                    {txt: 'At the address mentioned', ownerId: '5c28d68ce3629fa3c6c86c03', at: 1546174568296},
                    {txt: 'Im coming in half an hour', ownerId: '5c28d68ce3629fa3c6c86c02', at: 1546174568296},
                    {txt: 'If it bites you go get a shot against rabies', ownerId: '5c28d68ce3629fa3c6c86c04', at: 1546174568296},
                    {txt: 'But bat is not a mammal', ownerId: '5c28d68ce3629fa3c6c86c01', at: 1546174568296},
                    {txt: 'Of course it is, it\'s a mouse with wings', ownerId: '5c28d68ce3629fa3c6c86c04', at: 1546174568296}]
    },
    {
        _id: 'cde',
        title: 'Milk spilled from truck',
        description: 'Lo mevi hu leTnuva beizim vehalav',
        category: 'Traffic & walkways',
        createdAt: 1546174568296,
        severity: 6.3,
        seenCount: 212,
        shareCount: 10,
        isResolved: true,
        location: {
            pos: {
                lat: 32.055090,
                lng: 34.791920
            },
            address: 'Igal Alon 18 Tel Aviv',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177617/milk.jpg',
        ownerId: '5c28d68ce3629fa3c6c86c00',
        comments: []
    },
    {
        _id: 'abc',
        title: 'a lot a lot a lot of garbage on the street',
        description: 'garbage is thrown all over the street!',
        category: 'Sanitation',
        createdAt: 1546174568296,
        severity: 4.3,
        seenCount: 12,
        shareCount: 2,
        isResolved: true,
        location: {
            pos: {
                lat: 32.082060,
                lng: 34.770830
            },
            address: 'Ben Yehuda 85 Tel Aviv',
        },
        pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177614/garbage.jpg',
        ownerId: '5c28d68ce3629fa3c6c86c04',
        comments: [{txt: 'Im coming to help', ownerId: '5c28d68ce3629fa3c6c86c01', at: 1546174568296}, 
                   {txt: 'dont come the issue is resolved', ownerId: '5c28d68ce3629fa3c6c86c04', at: 1546174568296},
                   {txt: 'ok thanks', ownerId: '5c28d68ce3629fa3c6c86c01', at: 1546174568296}, 
                  ]
    }
]