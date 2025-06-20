const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

dotenv.config(); // Load .env variables

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("MongoDB connection failed:", err.message);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration (Only once)
app.use(session({
    secret: 'your-secret-key', // Use a secure key in production
    resave: false,
    saveUninitialized: false,
}));

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session && req.session.doctor) {
        return next();
    }
    res.redirect('/login');
}

// Import routes
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const documentsRoutes = require('./routes/documentsRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');

// Mount routes
app.use('/', authRoutes);
app.use('/appointment', isAuthenticated, appointmentRoutes);
app.use('/patients', isAuthenticated, patientRoutes);
app.use('/medications', isAuthenticated, medicationRoutes);
app.use('/documents', isAuthenticated, documentsRoutes);
app.use('/messages', isAuthenticated, messageRoutes);

// Public pages
app.get('/signup', (req, res) => res.render('signup'));
app.get('/login', (req, res) => res.render('login'));

// Protected page
app.get('/index', isAuthenticated, (req, res) => {
    res.render('index', { doctor: req.session.doctor });
});

// Optional: logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/login');
    });
});

// Other pages (can also protect them if needed)
app.get('/finance', isAuthenticated, (req, res) => res.render('finance'));
app.get('/settings', isAuthenticated, (req, res) => res.render('settings'));
app.get('/chatbot', isAuthenticated, (req, res) => res.render('chatbot'));

// Export the app
module.exports = app;
