const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Author', 'Editor', 'Reviewer'], required: true }
});

const userModel = mongoose.model.User || mongoose.model('User', userSchema);

module.exports = userModel;