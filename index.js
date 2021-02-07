const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { PORT = 3333 } = process.env;
const app = express();

app.use(cors());
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(PORT, () => console.log(`app is listening port ${PORT}`));