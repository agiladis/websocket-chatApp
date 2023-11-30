const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const Sentry = require('@sentry/node');
const jwt = require('jsonwebtoken');

const ResponseTemplate = require('../helper/response.helper');
const hashPassword = require('../utils/hashPassword');
const hashResetToken = require('../utils/hashResetToken');
const { userActivation, passwordResetEmail } = require('../lib/mailer');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_RESET_SECRET_KEY = process.env.JWT_RESET_SECRET_KEY;

async function Register(req, res) {
  const { name, email, password, phoneNumber, dob, role } = req.body;

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return res
        .status(400)
        .json(ResponseTemplate(null, 'bad request', 'email already used', 400));
    }

    const phoneNumberExist = await prisma.user.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (phoneNumberExist) {
      return res
        .status(400)
        .json(
          ResponseTemplate(
            null,
            'bad request',
            'phone number already used',
            400
          )
        );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        dob: new Date(dob),
        role: role,
      },
    });

    if (!newUser) {
      return res
        .status(400)
        .json(ResponseTemplate(null, 'failed to register new user', null, 400));
    }

    const activationLink = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/activation/${newUser.id}`;

    await userActivation(newUser.email, activationLink);

    return res.status(201).json(ResponseTemplate(null, 'created', null, 201));
  } catch (error) {
    Sentry.captureException(error);
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

async function Login(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res
        .status(404)
        .json(
          ResponseTemplate(
            null,
            'bad request',
            'invalid email or password',
            404
          )
        );
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res
        .status(404)
        .json(
          ResponseTemplate(
            null,
            'bad request',
            'invalid email or password',
            404
          )
        );
    }

    const token = jwt.sign(
      { email: existingUser.email, phoneNumber: existingUser.phoneNumber },
      JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    return res
      .status(200)
      .json(ResponseTemplate({ token: token }, 'login succcess', null, 200));
  } catch (error) {
    Sentry.captureException(error);
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res
        .status(404)
        .json(ResponseTemplate(null, 'bad request', 'email not found', 404));
    }

    if (
      existingUser.resetToken != null &&
      existingUser.resetToken > new Date()
    ) {
      return res
        .status(400)
        .json(
          ResponseTemplate(
            null,
            'bad request',
            'A password reset request is already pending for your account. Please check your email',
            400
          )
        );
    }

    const resetToken = jwt.sign(
      {
        id: existingUser.id,
        email: email,
      },
      JWT_RESET_SECRET_KEY,
      { expiresIn: '10m' }
    );

    const hashedResetToken = await hashResetToken(resetToken);

    const addResetToken = await prisma.user.update({
      where: { email },
      data: { resetToken: hashedResetToken },
    });

    if (!addResetToken) {
      return res
        .status(400)
        .json(
          ResponseTemplate(
            null,
            'bad request',
            'reset password request failed',
            400
          )
        );
    }

    const resetPasswordLink = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/reset-password/${resetToken}`;

    const isErr = await passwordResetEmail(email, resetPasswordLink);

    if (isErr) {
      return res
        .status(400)
        .json(ResponseTemplate(null, 'bad request', isErr, 400));
    }

    return res
      .status(200)
      .json(
        ResponseTemplate(
          { token: resetToken },
          'password reset request was successful',
          null,
          200
        )
      );
  } catch (error) {
    Sentry.captureException(error);
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = { Register, Login, forgotPassword };
