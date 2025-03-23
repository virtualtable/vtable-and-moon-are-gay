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
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, Date.now() + ext);
        }
    }),
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.body.password) return res.status(400).json({ error: 'Password required' });

    const { sha256Hash, md5Hash } = hashPassword(req.body.password);
    const { sha256Hash: correctSHA, md5Hash: correctMD5 } = hashPassword(PASSWORD);

    if (sha256Hash !== correctSHA || md5Hash !== correctMD5) {
        return res.status(403).json({ error: 'Invalid password' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
