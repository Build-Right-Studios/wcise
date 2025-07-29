const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Author', 'Editor'], required: true },
  comments: [
  {
    paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
    comment: String,
    commentedAt: { type: Date, default: Date.now }
  }
]

});

const userModel = mongoose.model.User || mongoose.model('User', userSchema);
module.exports = userModel;
