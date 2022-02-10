const mongose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }],
  content: {
    type: String
  },
  liked: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    body: String,
    date: Date
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

PostSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongose.model('posts', PostSchema);