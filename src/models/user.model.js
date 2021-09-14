const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');

const userSChema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

userSChema.statics.isEmailTaken = async function (userEmail) {
  const user = await this.findOne({ email: userEmail });
  return !!user;
};

userSChema.methods.isPasswordMatch = function (password) {
  const user = this;
  return bcrypt.compare(user.password, password);
};

// userSChema.methods.changePassword = function (password) {
//   const user = this;
//   user.password = password;
//   return user.save();
// };

module.exports = mongoose.model('User', userSChema);
