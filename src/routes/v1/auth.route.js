const express = require('express');
const router = express.Router();
const {
  Register,
  Login,
  forgotPassword,
} = require('../../controllers/auth.controller');
const {
  ValidateCreateUserRequest,
  ValidateGetUserRequest,
  validateForgotPasswordRequest,
} = require('../../middleware/validationRequest');

router.post('/register', ValidateCreateUserRequest, Register);
router.post('/login', ValidateGetUserRequest, Login);
router.post('/forgot-password', validateForgotPasswordRequest, forgotPassword);

module.exports = router;
