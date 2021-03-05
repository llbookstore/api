
const account = require('./account');
const advisory = require('./advisory');
const author = require('./author');
const category = require('./category');
const sale = require('./sale');
const book = require('./book');
const publishing_house = require('./publishing_house');
module.exports = function (app) {
    app.use('/', account);
    app.use('/', advisory);
    app.use('/', author);
    app.use('/', category);
    app.use('/', sale);
    app.use('/', book);
    app.use('/', publishing_house);
}