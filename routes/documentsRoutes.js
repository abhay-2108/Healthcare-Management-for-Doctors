const express = require('express');
const router = express.Router();
const multer = require('multer');
const Document = require('../models/documentsSchema');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', async (req, res) => {
    const allDocs = await Document.find();

    const patientNames = [...new Set(allDocs.map(doc => doc.patientName))];

    res.render('documents', {
        patientNames,
        documents: allDocs
    });
});

router.post('/upload', upload.array('files'), async (req, res) => {
    const { patientName } = req.body;
    const fileUploads = req.files.map(file => ({
        patientName: patientName,
        file: {
            file: file.originalname,
            data: file.buffer,
            contentType: file.mimetype
        }
    }));

    await Document.insertMany(fileUploads);
    res.status(200).send('Files uploaded');
});

router.get('/file/:id', async (req, res) => {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).send('Not found');
    res.contentType(doc.file.contentType);
    res.send(doc.file.data);
});

module.exports = router;
