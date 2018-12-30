'use strict';

const issueService = require('../services/issue-service')
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
        userService.add(user)
          .then(user => res.json(user))
      })
      
    // app.get(`/:id`, (req, res) => {
    //     const userId = req.params.id
    //     Promise.all([
    //         userService.getById(userId),
    //         issueService.query({ userId })
    //     ])
    //     .then(([user, issues]) => {
    //         console.log({user})
    //         res.json({user,issues})
    //     })
    // })
}