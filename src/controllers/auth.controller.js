const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const ResponseTemplate = require('../helper/response.helper');
const hashPassword = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function Register(req, res) {
  const { name, email, password, phoneNumber, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json(ResponseTemplate(null, 'bad request', 'email already used', 400));
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        role: role,
      },
    });

    if (!newUser) {
      return res
        .status(400)
        .json(ResponseTemplate(null, 'failed to register new user', null, 400));
    }

    return res
      .status(201)
      .json(ResponseTemplate(newUser, 'created', null, 201));
  } catch (error) {
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
      { expiresIn: '1h' }
    );

    return res
      .status(200)
      .json(ResponseTemplate({ token: token }, 'login succcess', null, 200));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = { Register, Login };
