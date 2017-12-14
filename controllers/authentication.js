// Logic to process request
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  // The 'sub' is in the JWT and it contaians who the token is for
  // 'iat' or issued at time, is just for knowing when someone recieved a token
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = function(req, res, next) {
  // User has already had their email and passrod auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

// req - request, res - response, next - for error handling
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  
  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }
  
  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if(err) { return next(err); }
    
    // If user with email does exist, return error
    if(existingUser) {
      // 422 is unprocessable entity
      return res.status(422).send({ error: 'Email is in use' });
    }
    
    // If does not exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });
    
    // Saves user with this
    user.save(function(err) {
      if(err) { return next(err); }
      //Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
