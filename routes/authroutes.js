const passport = require("passport");
const authentication = require('../controllers/authentication');
const requireAuth = passport.authenticate('jwt', {session: 'false'});
const requireSignin = passport.authenticate('local', {session: 'false'});

module.exports = (app) => {

  app.post('/signup', authentication.signup);
  app.post('/signin', requireSignin, authentication.signin);

  /*
    When url is hit it kicks off the passport google authentication method.
    Asking for profile and email from google (other stuff can be added i.e contacts).
*/
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    }
  ));

  app.get("/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect('/surveys');
    }
  );



  app.get('/auth/facebook',
    passport.authenticate('facebook')
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/surveys');
  });



  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
