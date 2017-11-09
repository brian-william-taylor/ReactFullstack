const mongoose = require('mongoose');
// Destructering -> const Schema = mongoose.Schema;
const {
  Schema
} = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
