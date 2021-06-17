
import express from 'express'
import account from './account';
import advisory from './advisory';
import author from './author';
// const category = require('./category');
// const sale = require('./sale');
// const book = require('./book');
// const publishing_house = require('./publishing_house');
// const bill = require('./bill');
// const news = require('./news');
// const review = require('./review');
export default function (app: express.Application) {
    app.use('/', account);
    app.use('/', advisory);
    app.use('/', author);
    // app.use('/', category);
    // app.use('/', sale);
    // app.use('/', book);
    // app.use('/', publishing_house);
    // app.use('/', bill);
    // app.use('/', news);
    // app.use('/', review);
}