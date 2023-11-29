const router = require('express').Router();
const activateAccount = require('../../controllers/activation.controller')

router.get('/:id', activateAccount);

module.exports = router;
