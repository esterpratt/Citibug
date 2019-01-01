'use strict';

import {secretData} from './secretData.js'
const axios = require('axios')

export default {
    getApiKey,
    getCurrLoc,
    getCoordsByAddress,
    getAddressByCoords
}

const API_KEY = secretData['Google_API_KEY'];
// var locs = [{ lat: 11.22, lng: 22.11 }]

function getApiKey() {
    return API_KEY;
}

function getCurrLoc() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)})
        .then(position => {
            return [position.coords.longitude, position.coords.latitude];
        })
}

function getCoordsByAddress(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(locRes => {          
            return [locRes.data.results[0].geometry.location.lng, locRes.data.results[0].geometry.location.lat]
        });
}

function getAddressByCoords(coords) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[1]},${coords[0]}&key=${API_KEY}`)
    .then(locRes => {
        const addressToReturn = locRes.data.results[0] ? 
                                locRes.data.results[0].formatted_address :
                                'Unknown Address'
        return addressToReturn
    })
}