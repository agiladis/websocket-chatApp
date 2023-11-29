const router = require('express').Router();
const authRouter = require('./auth.route');
const chatRouter = require('./chat.route');

router.use('/v1/auth', authRouter);
router.use('/v1/chats', chatRouter);

module.exports = router;
