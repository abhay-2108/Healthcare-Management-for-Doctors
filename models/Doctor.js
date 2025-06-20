const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash password before saving
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Doctor', doctorSchema);
