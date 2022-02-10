const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    _id: { type: Number },
    value: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    _id: false,
    timestamps: true,
  }
);

CategorySchema.plugin(AutoIncrement);

module.exports = mongoose.model('categories', CategorySchema);