const express = require('express');
const router = express.Router();
const { Send } = require('../../controllers/chat.controller');
const authenticateToken = require('../../middleware/auth');

router.post('/', authenticateToken, Send);

module.exports = router;
