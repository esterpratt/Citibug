'use strict';

const Axios = require('axios')
const axios = Axios.create({
    withCredentials: true,
})
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

    let queryParams = new URLSearchParams()
    for (let key in filter) {
        queryParams.append(key, filter[key])
    }
    return axios.get(`${BASE_URL}/issue?${queryParams}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log('ERROR:', err);
        })
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
        .then(res => res.data)
}

async function saveIssue(issue, user) {
    if (issue.oldPic !== issue.newPic) {
        // upload pic to cloudinary
        issue.newPic = await cloudinaryService.uploadImg(issue.picPath)
        issue.oldPic = issue.newPic
    }

    if (issue._id) {
        return axios.put(`${BASE_URL}/issue/${issue._id}`, issue)
            .then(res => res.data)
    } else {
        issue.createdAt = Date.now();
        issue.ownerId = user ? user._id : ''
        return axios.post(`${BASE_URL}/issue`, issue)
            .then(res => res.data)
    }
}