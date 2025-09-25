let mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "thang nay khong duoc de trong"],
        unique: true
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model('category', schema)
