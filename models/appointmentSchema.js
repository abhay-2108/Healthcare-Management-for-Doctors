const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: String,
    gender: String,
    dob: Date,
    age: Number,
    department: String,
    patientCode: {
        type: Number,
        default: function () {
            return Math.floor(100000 + Math.random() * 900000); 
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
