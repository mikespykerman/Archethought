const jwt = require('jsonwebtoken');

const JWTUtil = {
  generateToken(account) {
    return jwt.sign(
      {
        uid: account.uid,
        oid: account.oid,
      },
      process.env.JWTSECRET,
      //'9*&7^6%5$43#2@1!',
      {
        expiresIn: 604800, // expires in 7 days
      }
    );
  },
};

module.exports = JWTUtil;