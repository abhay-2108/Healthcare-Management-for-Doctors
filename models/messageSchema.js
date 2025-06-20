const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true }, // Mobile number
    message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
