'use strict';

const axios = require('axios')

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : '//localhost:3000';

export default {
    query
}

function query(userId) {
    let queryParams = new URLSearchParams()
    queryParams.append('userId', userId)

    return axios.get(`${BASE_URL}/msg?${queryParams}`)
        .then(res => res.data)
        .catch(err => {
            console.log('ERROR:', err);
        })
}