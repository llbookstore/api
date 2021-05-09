//sequelize
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { sale } = db.initModels(sequelize);
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
module.exports = {
    async addSale(req, res, next) {
        try {
            const { percent, date_start, date_end } = req.body;
            if (!percent || !date_start || !date_end
                || !Number.isInteger(percent) || percent > 100 || percent < 0
                || !Number.isInteger(date_start) || date_start.length < 7
                || !Number.isInteger(date_end) || date_end.length < 7
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
            let { percent, date_start, date_end } = req.body;

            const findSaleById = await sale.findOne({ where: { sale_id: id } });
            if (!findSaleById) return res.json(returnError(404, `can't find this sale`, {}, req.path));

            if (
                (percent && (!Number.isInteger(percent) || percent > 100 || percent < 0))
                || (date_start && (!Number.isInteger(date_start) || date_start.length < 7))
                || (date_end && (!Number.isInteger(date_end) || date_end.length < 7))
            )
                return res.json(returnError(400, 'invalid input', {}, req.path));
            if (!date_start) date_start = findSaleById.date_start;
            if (!date_end) date_end = findSaleById.date_end;
            if (!percent) percent = findSaleById.percent;
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { percent, date_start, date_end, updated_at, updated_by };
            await sale.update(data, { where: { sale_id: id } });
            data.date_start = timestampToDate(data.date_start);
            data.date_end = timestampToDate(data.date_end);
            data.updated_at = timestampToDate(data.created_at);
            return res.json(returnSuccess(200, 'update sale successful!', { data }, req.path));

        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async getSales(req, res, next) {
        try {
            const { q = '', active, current_page, row_per_page } = req.query;
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page)) {
                offset = (parseInt(current_page) - 1) * limit;
            }
            const condition = {
                [Op.or]: [
                    { percent: { [Op.substring]: q } },
                    { sale_id: { [Op.substring]: q } }
                ]
            };
            if (active === '1' || active === '0') condition.active = active;
            const getSales = await sale.findAndCountAll({ 
                where: condition,
                limit: limit,
                offset: offset
            });
            return res.json(returnSuccess(200, 'OK', getSales, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },
    async getSaleById(req, res, next) {
        const path = req.path;
        try {
            const { id } = req.params;
            const findSaleById = await sale.findOne({
                where: {
                    sale_id: id,
                }
            });
            return res.json(returnSuccess(200, 'OK', findSaleById, path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, path));
        }
    },

    async deleteSale(req, res, next) {
        try {
            const { id } = req.params;
            const findSale = await sale.findByPk(id);
            if (!findSale) return res.json(returnError(404, `can't find the sale`, {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { updated_at, updated_by, active: 0 }
            await sale.update(data, { where: { sale_id: id } });
            return res.json(returnSuccess(200, 'deleted sale successfully!', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async restoreSale(req, res, next) {
        try {
            const { id } = req.params;
            const findSale = await sale.findByPk(id);
            if (!findSale) return res.json(returnError(404, `can't find the sale`, {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { updated_at, updated_by, active: 1 }
            await sale.update(data, { where: { sale_id: id } });
            return res.json(returnSuccess(200, 'deleted sale successfully!', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    }

}