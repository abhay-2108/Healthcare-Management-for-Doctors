const express = require('express');
const router = express.Router();
const Patient = require('../models/patientSchema'); // Adjust path if needed

// Route: Get all patients
router.get('/', async (req, res) => {
    try {
        let patients = await Patient.find().lean(); // .lean() removes Mongoose metadata

        // Convert Map fields to plain objects
        patients = patients.map(p => {
            if (p.healthRecords instanceof Map) {
                p.healthRecords = Object.fromEntries(p.healthRecords);
            }
            return p;
        });

        res.render('patients', { patients });
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).send('Server Error');
    }
});

// Route: Add a new patient
router.post('/', async (req, res) => {
    try {
        const {
            name,
            contact,
            address,
            dob,
            insurance,
            medicalHistory,
            currentMedications,
            familyHistory,
            emergencyContact,
            healthRecords
        } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Name is required' });
        }
        const newPatient = new Patient({
            name,
            contact,
            address,
            dob,
            insurance,
            medicalHistory: Array.isArray(medicalHistory) ? medicalHistory.map(i => i.trim()) : [],
            currentMedications: Array.isArray(currentMedications) ? currentMedications.map(i => i.trim()) : [],
            familyHistory: Array.isArray(familyHistory) ? familyHistory.map(i => i.trim()) : [],
            emergencyContact: {
                name: emergencyContact?.name || '',
                relation: emergencyContact?.relation || '',
                phone: emergencyContact?.phone || ''
            },
            healthRecords: typeof healthRecords === 'string' ? parseHealthRecords(healthRecords) : healthRecords
        });
        

        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// Helper function to parse healthRecords string into Map or object
function parseHealthRecords(recordStr) {
    const obj = {};
    if (recordStr && typeof recordStr === 'string') {
        const entries = recordStr.split(',').map(e => e.split(':'));
        for (const [key, val] of entries) {
            if (key && val) obj[key.trim()] = val.trim();
        }
    }
    return obj;
}

module.exports = router;
