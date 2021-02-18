
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { category, category_detail, book } = db.initModels(sequelize);
//config
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');

module.exports = {
    async getCategories(req, res, next) {
        try {
            const result = await category.findAll({});
            result.map(item => {
                if (item.dataValues.created_at)
                    item.dataValues.created_at = timestampToDate(item.dataValues.created_at);
                if (item.dataValues.updated_at)
                    item.dataValues.updated_at = timestampToDate(item.dataValues.updated_at);
            });
            return res.json(returnSuccess(200, 'OK', result, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            if (!isNumeric(id)) return res.json(returnError(404, 'invalid id', {}, req.path));
            const findCatById = await category.findOne({
                include: [
                    {
                        model: category_detail,
                        as: 'category_details',
                        include: [{
                            model: book,
                            as: 'book'
                        }
                        ]
                    }
                ],
                where: {
                    category_id: id
                }
            });
            if (!findCatById) return res.json(returnError(404, `can't find this category`, {}, req.path));

            return res.json(returnSuccess(200, 'OK', findCatById, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async addCategory(req, res, next) {
        try {
            const { name = '', quantity = 0, group_id = -1 } = req.body;
            if (name.length < 4 || !isNumeric(group_id)) return res.json(returnError(400, 'invalid input', {}, req.path));
            const created_at = getCurrentTimestamp();
            const created_by = req.userData.username;
            const data = { name, quantity, group_id, created_at, created_by };
            await category.create(data);
            return res.json(returnSuccess(200, 'add category successful!', data, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },
    async updateCategory(req, res, next) {
        try {
            const { id } = req.params;
            const findCatById = await category.findByPk(id);
            if (!findCatById) return res.json(returnError(404, `can't find the category`, {}, req.path));
            const { name, quantity, group_id } = req.body;
            if ((group_id && !isNumeric(group_id))
                || (quantity && !isNumeric(quantity))
                || (name && name.length < 4)
            )
                return res.json(returnError(400, 'invalid input', {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { name, quantity, group_id, updated_at, updated_by };
            await category.update(
                data,
                {
                    where: {
                        category_id: id
                    }
                });
            return res.json(returnSuccess(200, 'OK', data, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },
}