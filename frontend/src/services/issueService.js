'use strict';

const axios = require('axios')
import cloudinaryService from './cloudinaryService'

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : '//localhost:3000';

export default {
    query,
    removeIssue,
    getIssueById,
    saveIssue
}

function query(filter = {}) {

    let queryParams  = new URLSearchParams()
    for (let key in filter) {
        queryParams.append(key, filter[key])
    }
    return axios.get(`${BASE_URL}/issue?${queryParams}`)
        .then(res => {
            return res.data
        })
    //     // .catch(err =>{
    //     //     console.log('ERROR:', err);

    //     // })
}

function getIssueById(issueId) {
    return axios.get(`${BASE_URL}/issue/${issueId}`)
        .then(res => {
            var issue = res.data.issue
            issue.comments = res.data.comments
            return issue
        })
}

function removeIssue(issueId) {
    return axios.delete(`${BASE_URL}/issue/${issueId}`)
    // .then(res => res.data)
}

async function saveIssue(issue, user) {
    if (issue._id) {
        return axios.put(`${BASE_URL}/issue/${issue._id}`, issue)
    } else {
        issue.createdAt = Date.now();
        if (user) {
            issue.ownerId = user._id
        };
        // upload pic to cloudinary (if not the default pic)
        issue.pic = await cloudinaryService.uploadImg(issue.picPath)
        console.log(issue);
        
        // return axios.post(`${BASE_URL}/issue`, issue)
    }
}







// TO DELETE

// [
//     {
//         title: 'Turtle crossing the street',
//         description: 'A turtle is crossing the street and creats traffic jam',
//         category: 'Animals',
//         createdAt: 1546279940868,
//         severity: 5.3,
//         seenCount: 1,
//         shareCount: 1,
//         commentsCount: 3,
//         isResolved: false,
//         location: {
//             type: 'Point',
//             coordinates: [34.759140, 32.049720]
//         },
//         address: 'Yehuda Hayamit 6 Tel Aviv',
//         pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177621/turtle.jpg',
//         ownerId: '5c28d68ce3629fa3c6c86c00',
//     },
//     {
//         title: 'Dead flowers at old lady\'s garden',
//         description: 'can somebody help me plant new flowers for her?',
//         category: 'Landscape',
//         createdAt: 1546289940868,
//         severity: 3.3,
//         seenCount: 5,
//         shareCount: 0,
//         commentsCount: 6,
//         isResolved: false,
//         location: {
//             type: 'Point',
//             coordinates: [34.799220, 32.097180]
//         },
//         address: 'Hamishna 1 Tel Aviv',
//         pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177596/flowers.jpg',
//         ownerId: '5c28d68ce3629fa3c6c86c01',
//     },
//     {
//         title: 'concrete fall from building',
//         description: 'pieces of concrete are falling from the 2nd floor',
//         category: 'Construction',
//         createdAt: 1546259940868,
//         severity: 7.3,
//         seenCount: 12,
//         shareCount: 22,
//         commentsCount: 2,
//         isResolved: false,
//         location: {
//             type: 'Point',
//             coordinates: [34.799560, 32.121380]
//         },
//         address: 'Rabina 17 Tel Aviv',
//         pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546178242/Concrete.jpg',
//         ownerId: '5c28d68ce3629fa3c6c86c02',
//     },
//     {
//     title: 'injured bat',
//     description: 'I found an injured bat, what should I do?',
//     category: 'Animals',
//     createdAt: 1546189940868,
//     severity: 9.3,
//     seenCount: 1,
//     shareCount: 6,
//     commentsCount: 5,
//     isResolved: false,
//     location: {
//         type: 'Point',
//         coordinates: [34.775680, 32.077900]
//     },
//     address: 'Zamanhoff 7 Tel Aviv',
//     pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177623/bat.jpg',
//     ownerId: '5c28d68ce3629fa3c6c86c03',
//     },
//     {
//     title: 'Milk spilled from truck',
//     description: 'Lo mevi hu leTnuva beizim vehalav',
//     category: 'Traffic & walkways',
//     createdAt: 1546179940868,
//     severity: 6.3,
//     seenCount: 212,
//     shareCount: 10,
//     isResolved: true,
//     location: {
//         type: 'Point',
//         coordinates: [34.791920, 32.055090]
//     },
//     address: 'Igal Alon 18 Tel Aviv',
//     pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177617/milk.jpg',
//     ownerId: '5c28d68ce3629fa3c6c86c00',
//     },
//     {
//     title: 'a lot a lot a lot of garbage on the street',
//     description: 'garbage is thrown all over the street!',
//     category: 'Sanitation',
//     createdAt: 1546164568296,
//     severity: 4.3,
//     seenCount: 12,
//     shareCount: 2,
//     commentsCount: 3,
//     isResolved: true,
//     location: {
//         type: 'Point',
//         coordinates: [34.770830, 32.082060]
//     },
//     address: 'Ben Yehuda 85 Tel Aviv',
//     pic: 'https://res.cloudinary.com/dnz0a2abj/image/upload/v1546177614/garbage.jpg',
//     ownerId: '5c28d68ce3629fa3c6c86c04',
//     }
// ]


// var comments = [
//     {
//         issueId: '5c2b61f36d73f01d1d25050a',
//         txt: 'car almost run over it',
//         ownerId: '5c28d68ce3629fa3c6c86c01',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050a',
//         txt: '1.5 meters left',
//         ownerId: '5c28d68ce3629fa3c6c86c00',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050a',
//         txt: 'its in halfway',
//         ownerId: '5c28d68ce3629fa3c6c86c02',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050b',
//         txt: 'I know her she is nice, I will come help',
//         ownerId: '5c28d68ce3629fa3c6c86c02',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050b',
//         txt: 'me too',
//         ownerId: '5c28d68ce3629fa3c6c86c03',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050b',
//         txt: 'Thanks! I\'ll bring a shovel',
//         ownerId: '5c28d68ce3629fa3c6c86c01',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050b',
//         txt: 'does she have sun at the garden?',
//         ownerId: '5c28d68ce3629fa3c6c86c03',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050b',
//         txt: 'yes',
//         ownerId: '5c28d68ce3629fa3c6c86c01',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050b',
//         txt: 'than we should plant anemon',
//         ownerId: '5c28d68ce3629fa3c6c86c03',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050c',
//         txt: 'OMG it almost fell on me!!',
//         ownerId: '5c28d68ce3629fa3c6c86c03',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050c',
//         txt: 'It\'s really dangerous, whatch out',
//         ownerId: '5c28d68ce3629fa3c6c86c01',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050d',
//         txt: 'I will take him to hospital, where are you?',
//         ownerId: '5c28d68ce3629fa3c6c86c02',
//         at: 1546044568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050d',
//         txt: 'At the address mentioned',
//         ownerId: '5c28d68ce3629fa3c6c86c03',
//         at: 1546054568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050d',
//         txt: 'Im coming in half an hour',
//         ownerId: '5c28d68ce3629fa3c6c86c02',
//         at: 1546164568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050d',
//         txt: 'If it bites you go get a shot against rabies',
//         ownerId: '5c28d68ce3629fa3c6c86c04',
//         at: 1546174368296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050d',
//         txt: 'But bat is not a mammal',
//         ownerId: '5c28d68ce3629fa3c6c86c01',
//         at: 1546174468296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050d',
//         txt: 'Of course it is, it\'s a mouse with wings',
//         ownerId: '5c28d68ce3629fa3c6c86c04',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050f',
//         txt: 'Im coming to help',
//         ownerId: '5c28d68ce3629fa3c6c86c01',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050f',
//         txt: 'dont come the issue is resolved',
//         ownerId: '5c28d68ce3629fa3c6c86c04',
//         at: 1546174568296,
//     },
//     {
//         issueId: '5c2b61f36d73f01d1d25050f',
//         txt: 'ok thanks',
//         ownerId: '5c28d68ce3629fa3c6c86c01',
//         at: 1546174568296,
//     },
// ]

// message
// [
//     {
//         type: 'resolve',
//         issueId: ObjectId('5c2b61f36d73f01d1d25050e'),
//         ownerId: '5c28d68ce3629fa3c6c86c00',
//         from: ObjectId('5c28d68ce3629fa3c6c86c01'),
//          at: 1546174568296
//     },
//     {
//         type: 'comment',
//         issueId: ObjectId('5c2b61f36d73f01d1d25050d'),
//         ownerId: '5c28d68ce3629fa3c6c86c03',
//         from: ObjectId('5c28d68ce3629fa3c6c86c02'),
//         at: 1546164568296
//     },
//     {
//         type: 'comment',
//         issueId: ObjectId('5c2b61f36d73f01d1d25050d'),
//         ownerId: '5c28d68ce3629fa3c6c86c03',
//         from: ObjectId('5c28d68ce3629fa3c6c86c02'),
//          at: 1546044568296
//     },
// ]

// var users = [
//     {
//         name: 'shula',
//         pass: 's123',
//         emoji: '👵'
//     },
//     {
//         name: 'shalom',
//         pass: 's234',
//         emoji: '🧑'
//     },
//     {
//         name: 'garfield',
//         pass: 'g345',
//         emoji: '😺'
//     },
//     {
//         name: 'abed',
//         pass: 'a456',
//         emoji: '👳'
//     },
//     {
//         name: 'lili',
//         pass: 'l567',
//         emoji: '👧🏿'
//     },
// ]