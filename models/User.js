const mongoose = require('mongoose');
// Destructering -> const Schema = mongoose.Schema;
const {
  Schema
} = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  credits: { type: Number, default: 0}
});

mongoose.model('users', userSchema);
