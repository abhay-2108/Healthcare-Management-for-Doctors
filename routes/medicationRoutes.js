const express = require('express');
const router = express.Router();
const Medication = require('../models/medicationSchema');


router.get('/', async (req, res) => {
    try {
        const medications = await Medication.find(); 
        res.render('medications', { medications });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.post('/add', async (req, res) => {
    try {
      const {
        patientName,
        drugName,
        drugClass,
        uses,
        dosage,
        administration,
        warnings,
        sideEffects,
        storage,
        manufacturer
      } = req.body;
  
      const newMedication = new Medication({
        patientName,
        drugName,
        drugClass,
        uses,
        dosage,
        administration,
        warnings,
        sideEffects,
        storage,
        manufacturer
      });
  
      await newMedication.save();
      res.status(200).json({ message: 'Medication added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add medication' });
    }
  });
  
  

module.exports = router;