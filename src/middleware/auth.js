const jwt = require('jsonwebtoken');
const ResponseTemplate = require('../helper/response.helper');
const { JWT_SECRET_KEY } = process.env;

async function authenticateToken(req, res, next) {
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

module.exports = authenticateToken;
