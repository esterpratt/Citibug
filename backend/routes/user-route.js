'use strict';

const userService = require('../services/user-service')

module.exports = addRoutes;

function addRoutes(app) {
    app.put('/login', (req, res) => {
        const user = req.body
        userService.checkLogin(user)
          .then(user => {
            req.session.user = user
            res.json(user)
          })
      })

    app.post('/signup', (req, res) => {
        const user = req.body
        userService.checkLogin(user)
          .then(user => {
            if (user) {
              res.status(400).send('User allready exist')
            } else {
              userService.add(user)
                .then(res.end())
            }
      })
    })

    app.delete('/logout', (req, res) => {
      req.session.user = null
      res.end()
    })
}