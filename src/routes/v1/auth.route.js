const express = require('express');
const router = express.Router();
const {
  Register,
  Login,
  forgotPassword,
  resetPassword,
} = require('../../controllers/auth.controller');
const {
  ValidateCreateUserRequest,
  ValidateGetUserRequest,
  validateForgotPasswordRequest,
  validateResetPasswordRequest,
} = require('../../middleware/validationRequest');
const { authenticateResetToken } = require('../../middleware/auth');

router.post('/register', ValidateCreateUserRequest, Register);
router.post('/login', ValidateGetUserRequest, Login);
router.post('/forgot-password', validateForgotPasswordRequest, forgotPassword);
router.post(
  '/reset-password/:resetToken',
  validateResetPasswordRequest,
  authenticateResetToken,
  resetPassword
);

module.exports = router;
