const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  // TODO: if password is not modified, call next() and return
  // TODO: generate salt with bcrypt.genSalt(10)
  // TODO: hash this.password with the salt
  next();
});

// Compare entered password to hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // TODO: return bcrypt.compare(enteredPassword, this.password)
};

module.exports = mongoose.model('User', UserSchema);