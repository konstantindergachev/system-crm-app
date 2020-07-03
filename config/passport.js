const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey,
};

const getJwtPayload = async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (user) return done(null, user);
    return done(null, false); //false, because is no user
  } catch (err) {
    console.log('Passport error: ', err);
  }
};
module.exports = (passport) => {
  passport.use(new JwtStrategy(options, getJwtPayload));
};
