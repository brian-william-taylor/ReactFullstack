const mongoose = require('mongoose');
// Destructering -> const Schema = mongoose.Schema;
const {Schema} = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {type: Boolean, default: false},
});

module.exports = recipientSchema;
