const passport = require("passport");

module.exports = (app) => {
  /*
    When url is hit it kicks off the passport google authentication method.
    Asking for profile and email from google (other stuff can be added i.e contacts).
*/
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));


  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
