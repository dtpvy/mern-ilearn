const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  fullname: {
    type: String
  },
  displayName: {
    type: String,
    default: function () {
      if (this.username) {
        return this.username;
      }
      return null;
    }
  },
  description: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  role: {
    type: String
  },
  banned: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', UserSchema);