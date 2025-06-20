const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const bcrypt = require('bcrypt');

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if user already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).send("Email already in use.");
        }

        const newDoctor = new Doctor({ fullname, email, password });
        await newDoctor.save();

        // Redirect or render success
        res.render('index', { user: newDoctor });
    } catch (err) {
        console.error(err);
        res.status(500).send("Signup failed.");
    }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(401).send("Doctor not found");
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(401).send("Incorrect password");
        }

        // Set session
        req.session.doctor = {
            id: doctor._id,
            name: doctor.fullname,
            email: doctor.email
        };

        res.redirect('/index'); // or /dashboard

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

function isAuthenticated(req, res, next) {
    if (req.session && req.session.doctor) {
        return next();
    }
    res.redirect('/login'); // redirect to login if not authenticated
}
module.exports = router;