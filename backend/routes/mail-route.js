const mailService = require('../services/mail-service');

module.exports = addRoutes;

function addRoutes(app) {
    app.post('/mail', (req, res) => {
        const mailOptions = req.body;
        mailService.sendMail(mailOptions)
            // .then(res => res.json(res));
    })
}