const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { PORT = 3333 } = process.env;
const app = express();
const db = require('./config/connectDB')

// Allow Cross-Origin requests
app.use(cors());
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));    
require('./routes/index')(app)
app.listen(PORT, () => console.log(`app is listening port ${PORT}`));