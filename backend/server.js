'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express();

const issueRoute = require('./routes/issue-route')
const userRoute = require('./routes/user-route')
const msgRoute = require('./routes/msg-route')

const cors = require('cors')
const history = require('connect-history-api-fallback');

// app.use(cors())
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
  
  app.use(history({
      varbose: true
  }));
  app.use(express.static(__dirname + '/public'));
  issueRoute(app);
  userRoute(app);
  msgRoute(app);
  
  
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => console.log(`server on ${port}`));
  const io = require('socket.io').listen(server);
  const setupIo = require('./services/socket-service')
  setupIo(io)