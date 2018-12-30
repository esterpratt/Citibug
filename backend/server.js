'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express();

const issueRoute = require('./routes/issue-route')
const userRoute = require('./routes/user-route')

const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}))

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(express.static('public'));
issueRoute(app);
userRoute(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
})