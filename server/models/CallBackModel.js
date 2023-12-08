const mongoose = require('mongoose');

const callbackRequestSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
});

const CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema);

module.exports = CallbackRequest;
