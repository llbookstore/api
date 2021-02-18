
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { book } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
const timeRegex = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$');

module.exports = {
    
    async getBooks(req, res, next) {
        try {
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },
    async getBookById(req, res, next) {
        try {
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, path));
        }
    },

    async addBook(req, res, next) {
        try {

        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async updateBook(req, res, next) {
        try {
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },
}