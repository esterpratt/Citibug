'use strict';

const msgService = require('../services/msg-service')

module.exports = addRoutes;

function addRoutes(app) {
    app.get('/msg', (req, res) => {
        const {userId} = req.query      
        msgService.query(userId)
          .then(msgs => res.json(msgs))
        })
    }

    