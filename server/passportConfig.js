// const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('../config');
const userController = require('./dbControllers/userController');


const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  userController.findUserByEmailAddress(jwtPayload.emailAddress)
    .then((userInstance) => {
      if (!userInstance) {
        return done(null, false, { message: 'User does not exist' });
      }
      return done(null, userInstance);
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.get('emailAddress'));
});

passport.deserializeUser((emailAddress, done) => {
  userController.findUserByEmailAddress(emailAddress)
    .then(user => done(null, user))
    .catch(err => done(err));
});

module.exports = passport;
