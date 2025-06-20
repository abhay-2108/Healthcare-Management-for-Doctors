const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentSchema');

// Render the appointment page with all records
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.render('appointment', { appointments });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add new patient
router.post('/add', async (req, res) => {
    try {
        const { name, gender, dob, age, department } = req.body;
        await Appointment.create({ name, gender, dob, age, department });
        res.redirect('/appointment');
    } catch (err) {
        res.status(500).send('Error saving appointment');
    }
});

// Approve/delete selected patients
router.post('/approve', async (req, res) => {
    try {
        const { patientIds } = req.body;
        if (Array.isArray(patientIds)) {
            await Appointment.deleteMany({ _id: { $in: patientIds } });
        } else if (patientIds) {
            await Appointment.findByIdAndDelete(patientIds);
        }
        res.redirect('/appointment');
    } catch (err) {
        res.status(500).send('Error deleting appointments');
    }
});


module.exports = router;
