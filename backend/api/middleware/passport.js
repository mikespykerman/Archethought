const passport = require('passport');
// const User =  require('../models/entities/user');
const UserService = require('../services/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  //secretOrKey: process.env.JWTSECRET,
  secretOrKey: '9*&7^6%5$43#2@1!',
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, next) {
  try {
    const userService = new UserService();
    const user = await userService.getById(payload.uid)
    
    if (user) {
      const { uid, oid } = payload;
      next(null, { ...user.toJSON(), accountInfo: { uid, oid } });
    } else {
      next(null, false);
    }
    
  } catch (err) {
    return next(err, false, { message: err.message });
  }
});

function applyStrategies() {
   passport.use(jwtLogin);
}

module.exports = { applyStrategies };
