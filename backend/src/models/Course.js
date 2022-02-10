const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  hashtags: [String],
  content: {
    type: String
  },
  url: {
    type: String
  },
  saved: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      unique: true
    },
    body: String,
    date: {
      type: Date,
      default: Date.now
    },
    rate: Number
  }],
  author: {
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

CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model('courses', CourseSchema);