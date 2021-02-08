const express = require('express')
const router = express.Router();
const account = require('./account');
module.exports = function(app) {
    app.use('/', account);
}