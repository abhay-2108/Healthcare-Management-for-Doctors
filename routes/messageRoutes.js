const express = require('express');
const router = express.Router();
const Message = require('../models/messageSchema');

// API-only route to fetch messages
router.get('/api', async (req, res) => {
    try {
        const messages = await Message.find().lean();
        res.json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Render messages page
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().lean();
        res.render('messages', { messages });
    } catch (err) {
        console.error('Error rendering messages page:', err);
        res.status(500).send('Server Error');
    }
});

// Approve / Reject
router.post('/:name/approve', async (req, res) => {
    await Message.findByIdAndDelete(req.params.name);
    res.redirect('/messages');
});
router.post('/:name/reject', async (req, res) => {
    await Message.findByIdAndDelete(req.params.name);
    res.redirect('/messages');
});

module.exports = router;
