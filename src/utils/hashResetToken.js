const bcrypt = require('bcrypt');

const hashResetToken = async (token) => {
  const saltRounds = 10;
  return await bcrypt.hash(token, saltRounds);
};

module.exports = hashResetToken;
