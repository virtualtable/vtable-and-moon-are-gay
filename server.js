const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;
const PASSWORD = 'hawktuah1hack';

const hashPassword = (password) => {
    const sha256Hash = crypto.createHash('sha256').update(password).digest('hex');
    const md5Hash = crypto.createHash('md5').update(password).digest('hex');
    return { sha256Hash, md5Hash };
};

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
});

app.use(express.static('public'));

app.post('/api/upload', upload.single('file'), (req, res) => {
    const { password } = req.body;
    const { sha256Hash, md5Hash } = hashPassword(password);
    
    if (sha256Hash !== hashPassword(PASSWORD).sha256Hash || md5Hash !== hashPassword(PASSWORD).md5Hash) {
        return res.status(403).json({ error: 'Invalid password' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
