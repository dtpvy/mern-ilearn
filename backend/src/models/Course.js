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

CourseSchema.query.search = function (req) {
  if (req.query.hasOwnProperty('_search')) {
    const name = '.*' + req.query.name.replace(' ', '.*') + '.*';
    console.log(name);
    return this.find({ title: { $regex: name, $options: '$i' } });
    // if ((newPattern.length * 100 / patternKey.lenght) > 70) return this;
  } else {
    return this
  }
}

CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const type = ['desc', 'asc'].includes(req.query.type);
    const key = req.query.key;
    switch (key) {
      case '0': {
        this.sort({
          updatedAt: type ? req.query.type : 'desc',
        });
        break;
      }
      case '1': {
        this.sort({
          saved: type ? req.query.type : 'desc',
        });
        break;
      }
      case '2': {
        this.sort({
          comments: type ? req.query.type : 'desc',
        });
        break;
      }
      case '3': {
        this.sort({
          title: type ? req.query.type : 'desc',
        });
        break;
      }
      default: {
        console.log(key, type);
        break;
      }
    }
  }
  return this;
};

CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model('courses', CourseSchema);