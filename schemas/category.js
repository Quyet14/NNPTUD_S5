let mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
