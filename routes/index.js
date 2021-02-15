const express = require('express');
const account = require('./account');
const advisory = require('./advisory');
module.exports = function(app) {
    app.use('/', account);
    app.use('/', advisory);
}