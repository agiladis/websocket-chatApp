const jwt = require('jsonwebtoken');
const ResponseTemplate = require('../helper/response.helper');
const { JWT_SECRET_KEY, JWT_RESET_SECRET_KEY } = process.env;

function authenticateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json(
        ResponseTemplate(null, 'unauthorized', "you're not authorized!", 401)
      );
  }
  const token = authorization.split(' ')[1];

  jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(403)
        .json(ResponseTemplate(null, 'invalid token', error.message, 403));
    }

    req.user = decoded;
    next();
  });
}

function authenticateResetToken(req, res, next) {
  const { resetToken } = req.params;

  if (!resetToken) {
    return res
      .status(401)
      .json(
        ResponseTemplate(null, 'unauthorized', "you're not authorized!", 401)
      );
  }

  jwt.verify(resetToken, JWT_RESET_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(403)
        .json(
          ResponseTemplate(
            null,
            'invalid reset password token',
            error.message,
            403
          )
        );
    }

    req.user = decoded;
    next();
  });
}

module.exports = { authenticateToken, authenticateResetToken };
