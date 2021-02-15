const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { PORT = 3333 } = process.env;
const app = express();
const { upload, errHandling } = require('./middleware/upload')
// Allow Cross-Origin requests
app.use(cors());
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(errHandling);
app.post('/upload', upload.single('profile'), errHandling, (req, res) => {
    const { ass } = req.body;
    console.log(ass);
    console.log(req.file);
    res.json(req.file)
});
//images
app.use('/images', express.static('images'));
require('./routes/index')(app)
app.listen(PORT, () => console.log(`app is listening port ${PORT}`));