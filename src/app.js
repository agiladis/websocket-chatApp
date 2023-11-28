require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger');
const socketIO = require('socket.io');
const Sentry = require('@sentry/node');
const authRouter = require('./routes/auth.route');
const chatRouter = require('./routes/chat.route');
const socketHandler = require('./controllers/socket.controller');

const app = express();
const server = require('http').Server(app);
const io = socketIO(server);

const PORT = process.env.PORT;
const SENTRY_DSN = process.env.SENTRY_DSN;

socketHandler(io);
// const io = require('socket.io')(http, {
//   connectionStateRecovery: {},
// });

// to know how body request type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
app.use(logger);

// sentry
Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Middleware to make io accessible from routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);

// views route
// app.use('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });

server.listen(PORT, () => {
  console.log(`websocket chatApp listening at http://localhost:${PORT}`);
});
