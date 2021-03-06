const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { PORT = 3333 } = process.env;
const app = express();
const { upload, errHandling } = require('./middleware/upload')
// Allow Cross-Origin requests
app.use(cors(
    // {
    //     origin: '*',
    //     maxAge: 86400,
    //     methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'HEAD', 'DELETE']
    // }
)); //
//middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(errHandling);
app.post('/upload', upload.single('image'), errHandling, (req, res) => {
    res.json(req.file.filename)
});
//images
app.use('/images', express.static('images')); //dung api file anh public

require('./routes/index')(app)
app.listen(PORT, () => console.log(`app is listening port ${PORT}`)); //chay server