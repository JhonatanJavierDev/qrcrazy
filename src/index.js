const express = require('express');
const path = require('path');
const qrRoutes = require('./routes/qr.routes');
const app = express();
const port = 4321;

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/qr', qrRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
