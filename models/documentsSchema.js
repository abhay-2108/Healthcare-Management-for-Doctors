const mongoose = require('mongoose');

const documentsSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    file: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Document', documentsSchema);