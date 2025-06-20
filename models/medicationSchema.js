const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  drugName: { type: String, required: true },
  drugClass: String,
  uses: String,
  dosage: String,
  administration: String,
  warnings: String,
  sideEffects: String,
  storage: String,
  manufacturer: String
});

module.exports = mongoose.model('Medication', medicationSchema);