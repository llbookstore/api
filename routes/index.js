
const account = require('./account');
const advisory = require('./advisory');
const author = require('./author');
const category = require('./category');
const sale = require('./sale');
const book = require('./book');
const publishing_house = require('./publishing_house');
const bill = require('./bill');
const news = require('./news');
const review = require('./review');
module.exports = function (app) {
    app.use('/', account);
    app.use('/', advisory);
    app.use('/', author);
    app.use('/', category);
    app.use('/', sale);
    app.use('/', book);
    app.use('/', publishing_house);
    app.use('/', bill);
    app.use('/', news);
    app.use('/', review);
}