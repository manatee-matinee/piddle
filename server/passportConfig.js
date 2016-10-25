const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const userController = require('./dbControllers/userController');


passport.use(new LocalStrategy({
  usernameField: 'emailAddress',
  passwordField: 'password',
},
  (emailAddress, password, done) => {
    userController.findUserByEmailAddress(emailAddress)
      .then((userInstance) => {
        if (!userInstance) {
          return done(null, false, { message: 'Incorrect user name' });
        }
        return userController.verifyUser(emailAddress, password)
          .then((match) => {
            if (!match) {
              return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, userInstance);
          });
      })
      .catch(err => done(err));
  }
));

passport.serializeUser((user, done) => {
  done(null, user.get('emailAddress'));
});

passport.deserializeUser((emailAddress, done) => {
  userController.findUserByEmailAddress(emailAddress)
    .then(user => done(null, user))
    .catch(err => done(err));
});

module.exports = passport;
