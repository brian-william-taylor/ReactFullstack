const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
// Destructering -> const Schema = mongoose.Schema;
const {
  Schema
} = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  googleId: String,
  facebookId: String,
  credits: { type: Number, default: 0}
});

//On save Hook, encrypt password
userSchema.pre('save', function(next){
  const user = this;

  bcrypt.genSalt(10, function(err, salt){
    if(err) {return next(err);}

    //Hash the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){ return next(err); }

      user.password = hash;
      next();
    });
  })
});


userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){return callback(err);}

    callback(null, isMatch);
  });
}

mongoose.model('users', userSchema);
