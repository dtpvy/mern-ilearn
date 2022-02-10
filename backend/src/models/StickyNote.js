const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StickyNoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  state: {
    type: String,
    enum: ['TO LEARN', 'LEARNING', 'LEARNED']
  },
  note: [{
    title: String,
    body: String,
    color: String,
    date: Date.now
  }],
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

module.exports = mongoose.model('stickynotes', StickyNoteSchema);