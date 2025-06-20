const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    insurance: {
        type: String
    },
    medicalHistory: {
        type: [String]  
    },
    currentMedications: {
        type: [String]
    },
    familyHistory: {
        type: [String]
    },
    emergencyContact: {
        name: String,
        relation: String,
        phone: String
    },
    healthRecords: [String]
});

module.exports = mongoose.model('Patient', patientSchema);
