const express = require('express');
const router = express.Router();
const { Register, Login } = require('../controllers/auth.controller');
const {
  ValidateCreateUserRequest,
  ValidateGetUserRequest,
} = require('../middleware/validationRequest');

router.post('/register', ValidateCreateUserRequest, Register);
router.post('/login', ValidateGetUserRequest, Login);

module.exports = router;
