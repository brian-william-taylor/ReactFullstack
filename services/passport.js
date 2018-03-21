const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = mongoose.model('users');
const LocalStrategy = require('passport-local');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({facebookId: profile.id});

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({facebookId: profile.id}).save();
    done(null, user);
  }));

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({googleId: profile.id});

  if (existingUser) {
    return done(null, existingUser);
  }


  const user = await new User({googleId: profile.id}).save();
  done(null, user);
}));


//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.cookieKey
};

//create JWT strategy
// Payload is the decrypted jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // See if user exists in our database
  User.findById(payload.sub, function(err, user){
    if(err){return done(err, false); }

    if(user){
      done(null, user);
    }
    else{
      done(null, false);
    }

  });

});



// Create Local Login
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email,password, done){
  User.findOne( {email: email }, function(err,user){
    if(err){return done(err); }

    if(!user){return done(null,false); }

    //compare passwords - is 'password' equal to user.password
    user.comparePassword(password, function(err, isMatch){
      if(err){return done(err);}
      if(!isMatch){return done(null, false);}

      return done(null, user);
    })
  });
});


passport.use(jwtLogin);
passport.use(localLogin);
