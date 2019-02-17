const nodemailer = require('nodemailer');
const utilService = require('./util-service');
const ObjectId = require('mongodb').ObjectId;
const { gmailPass } = require('./secret-data');

module.exports = {
    sendMail
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'municipalepp@gmail.com',
    pass: gmailPass
  },
  tls: { rejectUnauthorized: false }
});

let mailOptions = {
  from: 'esterpratt@gmail.com',
  subject: 'Check out this issue from Municipal',
};

function sendMail(mailOptionsFromUser) {
    mailOptions = {...mailOptions, ...mailOptionsFromUser};
    let id = mailOptions.text.split('issue/')[1];
    issueId = new ObjectId(id);
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        utilService.incCount('issue', issueId, 'shareCount')
        console.log('Email sent: ' + info.response);
      }
    });
}