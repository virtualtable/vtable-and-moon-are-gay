const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;
const PASSWORD = 'hawktuah1hack';
const upload = multer({
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
    if (!req.body.password || req.body.password !== PASSWORD) {
        return res.status(403).json({ error: 'Invalid password' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
