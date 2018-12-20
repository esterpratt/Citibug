'use strict';

import {secretData} from './secretData.js'

export default {
    getApiKey,
    getLocs,
    getCurrLoc,
    getAddressLoc,
    getAddressByLoc,
    initMap,
    addMarker,
    panTo
}

const API_KEY = secretData['Google_API_KEY'];
// var locs = [{ lat: 11.22, lng: 22.11 }]

function getApiKey() {
    return API_KEY;
}

function getLocs() {
    return Promise.resolve(locs);
}

// function getLocs() {
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve(locs);
//         }, 2000)
//     });

// }


function getCurrLoc() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)})
        .then(position => {
            return {lat: position.coords.latitude, lng: position.coords.longitude};
        })
}

// function _saveToLocs(pos) {
//     locs.push(pos);
// }

function getAddressLoc(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(locRes => {
            // _saveToLocs(locRes.data.results[0].geometry.location)
            return locRes.data.results[0].geometry.location
        });
}

function getAddressByLoc(loc) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.lat},${loc.lng}&key=${API_KEY}`)
    .then(locRes => locRes.data.results)
}


var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {
     
    return _connectGoogleApi()
    .then(() => {
        // console.log('google available');
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        // console.log('Map!', map);
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng( lat,  lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    // const API_KEY = '';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}