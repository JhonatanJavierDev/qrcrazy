const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const generateQRCode = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const fileName = `${Date.now()}.png`;
    const filePath = path.join(__dirname, '..', 'public', 'qr-codes', fileName);

    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    await QRCode.toFile(filePath, text);
    
    const appUrl = process.env.APP_URL || '';
    const fileUrl = `${appUrl}/public/qr-codes/${fileName}`;

    return res.status(200).json({ qrCodeUrl: fileUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

module.exports = { generateQRCode };
