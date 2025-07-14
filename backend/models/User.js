const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: { type: String },
  dob: { type: Date },
  password: {
    type: String,
    required: false, // allows Google login
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
});

module.exports = mongoose.model("User", UserSchema);
