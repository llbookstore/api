//sequelize
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { bill, bill_detail, account } = db.initModels(sequelize);

const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
module.exports = {

    async getBills(req, res, next) {
        try {


            return res.json(returnSuccess(200, 'OK', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },
    async getBillById(req, res, next) {
        try {


            return res.json(returnSuccess(200, 'OK', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async addBill(req, res, next) {
        try {
            const { user_name, phone, address, user_note, payment_method, total_price, user_id } = req.body;
            console.log(user_name, phone, address, user_note, payment_method, total_price, user_id)
            if (!user_name || !phone || !address || payment_method > 3 || !total_price || !user_id)
                return res.json(returnError(410, 'invalid input', {}, req.path));
            const findUser = await account.findByPk(user_id);
            if (!findUser) return res.json(returnError(404, `can't find user account`, {}, req.path));

            const created_at = getCurrentTimestamp();
            const data = { user_name, phone, address, user_note, payment_method, total_price, created_at, user_id };
            //validation
            try {
                const item = await bill.build(data);
                await item.validate();
            } catch (err) {
                return res.json(returnError('400', err.message, {}, req.path));
            }
            const result = await bill.create(data);
            return res.json(returnSuccess(200, 'add a bill successful', result, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async addBillDetail(req, res, next) {
        try {


            return res.json(returnSuccess(200, 'OK', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async handleBill(req, res, next) {
        try {


            return res.json(returnSuccess(200, 'OK', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },
}