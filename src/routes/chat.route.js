const express = require('express');
const router = express.Router();
const Chat = require('../controllers/chat.controller');
const authenticateToken = require('../middleware/auth')

router.get('/chats', authenticateToken, Chat);

module.exports = router;
