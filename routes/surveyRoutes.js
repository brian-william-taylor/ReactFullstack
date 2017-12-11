const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
const Mailer = require('../services/Mailer');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting');
  });


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {title, subject, body, recipients } = req.body;
    //const user = await new User({googleId: profile.id}).save();
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send mail
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
     await mailer.send();
     await survey.save();
     req.user.credits -= 1;
     const user = await req.user.save();

     res.send(user);
   } catch (err) {
     res.status(422).send(err);
   }

  });
};
