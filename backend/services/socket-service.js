const commentService = require('./comment-service')
const utilService = require('./util-service')
const userService = require('./user-service')
const msgService = require('./msg-service')

const gUsersMap = {}

function setupIo(io) {
    io.on('connection', socket => {
        console.log('user connected!!!');

        socket.on('addUser', userId => {
            gUsersMap[userId] = socket.id
        })

        socket.on('removeUser', userId => {
            delete gUsersMap[userId]
        });

        socket.on('addComment', (comment, issueOwner) => {
            comment.at = Date.now()
            commentService.add(comment)
                .then(_ => {
                    utilService.incCount('issue', comment.issueId, 'commentsCount')
                    userService.getById(comment.ownerId)
                        .then(user => {
                            comment.user = [user];
                            io.emit('addNewComment', comment);
                        })
                    // TODO: put new users and issues, and then
                    // change != to !==. 
                    if (issueOwner && issueOwner != comment.ownerId) {
                        const msg = {
                            type: 'comment',
                            issueId: comment.issueId,
                            ownerId: issueOwner,
                            from: comment.ownerId,
                            at: comment.at,
                        }
                        msgService.add(msg)
                        userService.updateMsgCount(issueOwner, false)
                        io.to(gUsersMap[issueOwner]).emit('addNotification');
                    }
                })
        })

        socket.on('initNotification', userId => {
            userService.updateMsgCount(userId, true)
        })

        socket.on('toggleResolved', ({ from, issueId, ownerId, isResolved }) => {
            const type = (isResolved) ? 'open' : 'resolve'
            if (ownerId !== from) {
                const msg = {
                    type,
                    issueId,
                    ownerId,
                    from,
                    at: Date.now(),
                }
                msgService.add(msg)
                userService.updateMsgCount(ownerId, false)
                io.to(gUsersMap[ownerId]).emit('addNotification');
            }
            utilService.updateField('issue', issueId, 'isResolved', !isResolved)
            io.emit('toggleResolved', issueId);
        })

        socket.on('addSeen', issueId => {
            utilService.incCount('issue', issueId, 'seenCount')
            io.emit('addSeen', issueId);
        })
    })
}

module.exports = setupIo