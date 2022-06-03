const jwt = require("jsonwebtoken");

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
};

module.exports.verify = (token, callback) => {
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error(err);
      throw err;
    }
    callback(user);
  });
};
