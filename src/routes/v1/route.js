const router = require('express').Router();
const authRouter = require('./auth.route');
const chatRouter = require('./chat.route');
const activationRouter = require('./activation.route');

router.use('/v1/auth', authRouter);
router.use('/v1/chats', chatRouter);
router.use('/v1/activation', activationRouter);

module.exports = router;
