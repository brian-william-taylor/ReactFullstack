const jwt = require('jwt-simple');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.cookieKey);
}

exports.signin = function(req, res, next){
  res.send({token: tokenForUser(req.user)});
}

exports.signup = function (req, res, next){
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({error: "You must provide email and password"});
  }

    // See if a user exists -> REFACTOR
    User.findOne({ email: email }, function(err, existingUser){
      if(err) { return next(err); }

      // If a user with email does exist, return an error
      if(existingUser){
        return res.status(422).send({error: 'Email is in use'});
      }

      //If a user with email does not exist, create and save user record
      const user = new User({
        email: email,
        password: password
      });

      user.save(function (err) {
        if (err) {return next(err); }

        // Respond to request indicating the user was created
        res.send({token: tokenForUser(user)});
      });
    });



}
