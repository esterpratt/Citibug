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
      .then(foundUser => {
        if (foundUser) {
          res.status(400).send('User allready exist')
        } else {
          userService.add(user)
            .then(sigendUser => {
              req.session.user = sigendUser
              res.json(sigendUser)
            })
        }
      })
  })

  app.delete('/logout', (req, res) => {
    req.session.user = null
    res.end()
  })
}