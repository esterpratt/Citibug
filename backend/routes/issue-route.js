'use strict';

const issueService = require('../services/issue-service')
const commentService = require('../services/comment-service')
const userService = require('../services/user-service')

module.exports = addRoutes;

function requiredAuth(req, res, next) {
    const user = req.session.user;
    if (user) return res.status(200).send('Not Allowed')
    else next()
}

function addRoutes(app) {
    // get all issues
    app.get('/issue', (req, res) => {
        const filter = req.query;
        issueService.query(filter)
            .then(issues => res.json(issues));
    })

    // get one issue
    app.get('/issue/:issueId', (req, res) => {
        const issueId = req.params.issueId;
        Promise.all([
            issueService.getById(issueId),
            commentService.query(issueId)
                .then(comments => {
                    var prmCommentWithUser = comments.map(comment => {
                        return userService.getById(comment.ownerId)
                            .then(user => {
                                comment.user = user
                                return comment
                            })
                    })
                    return Promise.all(prmCommentWithUser)
                })
        ])
        .then(([issue, comments]) => {
            res.json({issue, comments})
        });
    })

    // delete issue
    app.delete('/issue/:issueId', requiredAuth, (req, res) => {
        const issueId = req.params.issueId;
        issueService.remove(issueId)
            .then(_ => res.end());
    })

    // update issue
    app.put('/issue/:issueId', requiredAuth, (req, res) => {
        const issue = req.body;
        issueService.update(issue)
            .then(issue => res.json(issue));
    })
    
    // add issue
    app.post('/issue', requiredAuth, (req, res) => {
        const issue = req.body;
        issueService.add(issue)
            .then(issue => res.json(issue));
    })
}