const express = require('express')
const account = require('./account');
module.exports = function(app) {
    app.use('/', account);
}