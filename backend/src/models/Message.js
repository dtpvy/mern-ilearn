const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MesageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
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

module.exports = mongoose.model('messages', MesageSchema);