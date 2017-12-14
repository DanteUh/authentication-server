const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// We tell passport to use the JWT to authennticate
// By default it will try to use a cookie which we don't have
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // We expect some request to come in, post, get etc.
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  // If the user is visiting our app '/signup' run Authentication.signup
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
