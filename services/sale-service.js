//sequelize
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { sale } = db.initModels(sequelize);

const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
module.exports = {
    async addSale(req, res, next) {
        try {
            const { percent, date_start, date_end } = req.body;
            if (!percent || !date_start || !date_end
                || !isNumeric(percent) || percent > 100 || percent < 0
                || !isNumeric(date_start) || date_start.length < 7
                || !isNumeric(date_end) || date_end.length < 7
            )
                return res.json(returnError(400, 'invalid input', {}, req.path));
            const created_at = getCurrentTimestamp();
            const created_by = req.userData.username;
            const data = { percent, date_start, date_end, created_at, created_by };
            const creSale = await sale.create(data);
            creSale.date_start = timestampToDate(data.date_start);
            creSale.date_end = timestampToDate(data.date_end);
            creSale.created_at = timestampToDate(data.created_at);
            return res.json(returnSuccess(200, 'add sale successful!', creSale, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async updateSale(req, res, next) {
        try {
            const { id } = req.params;
            if(!isNumeric(id)) return res.json(returnError(400,'invalid id', {}, req.path));
            let { percent, date_start, date_end } = req.body;

            if (!isNumeric(id)) return res.json(returnError(404, 'invalid id', {}, req.path));

            const findSaleById = await sale.findOne({ where: { sale_id: id } });
            if (!findSaleById) return res.json(returnError(404, `can't find this sale`, {}, req.path));

            if (
                (percent && (!isNumeric(percent) || percent > 100 || percent < 0))
                || (date_start && (!isNumeric(date_start) || date_start.length < 7))
                || (date_end && (!isNumeric(date_end) || date_end.length < 7))
            )
                return res.json(returnError(400, 'invalid input', {}, req.path));
            if(!date_start) date_start = findSaleById.date_start;
            if(!date_end) date_end = findSaleById.date_end;

            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { percent, date_start, date_end, updated_at, updated_by };
            await sale.update(data, {where: {sale_id: id}});
            data.date_start = timestampToDate(data.date_start);
            data.date_end = timestampToDate(data.date_end);
            data.updated_at = timestampToDate(data.created_at);
            return res.json(returnSuccess(200, 'update sale successful!', {data}, req.path));

        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async getSales(req, res, next) {
        try {
            const { percent } = req.query;
            const condition = {};
            if (isNumeric(percent) && percent <= 100 && percent > 0)
                condition.percent = percent;
            const getSales = await sale.findAll({ where: condition });
            return res.json(returnSuccess(200, 'OK', getSales, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    }


}