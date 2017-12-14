const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
// Schema is what we use to tell mongoose about
// the very particular fields that our model is going to have
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  // MongoDB should check if the email string is unique
  // before sending it to the database
  // It also has to be lowercase because Mongo thinks lower and uppercase are unique
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // Get access to the user model
  const user = this;
  
  // Generate a 'salt' then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }
    
    // Hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) {return next(err); }
      
      // Overwrite plain text password with encrypted password
      user.password = hash;
      // next() save the model
      next();
    })
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // bcrypt does the comparasion for us
  // It is taking the salt and the hashed password 
  // and internally does the hashing process on the candidatePassword
  // this.pass word is our hashed and salted password
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }
    
    callback(null, isMatch);
  })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
