const axios = require('axios')

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : '//localhost:3000';

export default {
    sendMail
}

function sendMail(mailOptions) {
    // return axios.post(`${BASE_URL}/mail`)
    axios.post(`${BASE_URL}/mail`, mailOptions)
        // .then(res => res.data)
        // .catch(err => {
        //     console.log('ERROR:', err);
        // })
}