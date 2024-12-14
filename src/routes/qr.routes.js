const express = require('express');
const { generateQRCode } = require('../controllers/qr.controller');
const router = express.Router();

router.post('/generate', generateQRCode);

module.exports = router;
