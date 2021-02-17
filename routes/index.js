
const account = require('./account');
const advisory = require('./advisory');
const author = require('./author');

module.exports = function (app) {
    app.use('/', account);
    app.use('/', advisory);
    app.use('/', author);
}