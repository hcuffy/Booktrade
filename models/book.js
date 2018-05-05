const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  cover: String,
  owner: [String],
  trader: [String],
   accepted : [],
}, {
  timestamps: true
});

const ModelClass = mongoose.model('book', BookSchema);

module.exports = ModelClass;
