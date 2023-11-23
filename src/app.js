require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger');
const authRouter = require('./routes/auth.route');
const chatRouter = require('./routes/chat.route');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  connectionStateRecovery: {},
});

const PORT = process.env.PORT;

// to know how body request type
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger
app.use(logger);

// views route
// app.use('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });

// socket.io
io.on('connection', (socket) => {
  console.log(`User connected : ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected ${socket.id}`);
  });

  socket.on('chat', (msg) => {
    console.log('Message:', msg);
    io.emit('chat', msg);
  });
});

// API route
app.use('/api/auth', authRouter);
app.use('/api', chatRouter);

http.listen(PORT, () => {
  console.log(`websocket chatApp listening at http://localhost:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`websocket chatApp listening at http://localhost:${PORT}`);
// });
