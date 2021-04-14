
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { category, category_detail, book } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, isNumeric } = require('../utils/common');

module.exports = {

    async getCategories(req, res, next) {
        try {
            const { active, q = '', row_per_page, current_page, is_first_layer } = req.query;
            const condition = {
                [Op.or]: [
                    { name: { [Op.substring]: q } },
                    { category_id: { [Op.substring]: q } }
                ]
            };
            if (active) condition.active = active;
            if (is_first_layer) condition.group_id = -1;
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page) && current_page > 0) {
                offset = (parseInt(current_page) - 1) * limit;
            }
            const result = await category.findAndCountAll(
                {
                    where: condition,
                    limit,
                    offset,
                    distinct:true
                });
            result.rows.map(item => {
                if (item.dataValues.created_at)
                    item.dataValues.created_at = timestampToDate(item.dataValues.created_at, 'DD/MM/YYYY');
                if (item.dataValues.updated_at)
                    item.dataValues.updated_at = timestampToDate(item.dataValues.updated_at, 'DD/MM/YYYY');
            });
            result.rows.sort((itemA, itemB) => itemA.ordering - itemB.ordering);
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
            if (name.length < 4) return res.json(returnError(400, 'invalid input', {}, req.path));
            const created_at = getCurrentTimestamp();
            const created_by = req.userData.username;
            const data = { name, quantity, group_id, created_at, created_by };
            if (group_id === -1) {
                const catFirstNum = await category.count({ where: { group_id: -1 } });
                data.ordering = catFirstNum + 1;
            }
            else {
                const catGroupNum = await category.count({ where: { group_id: group_id } });
                data.ordering = catGroupNum + 1;
            }

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
            // if (!isNumeric(id)) return res.json(returnError(400, 'invalid id', {}, req.path));
            const findCatById = await category.findByPk(id);
            if (!findCatById) return res.json(returnError(404, `can't find the category`, {}, req.path));
            const { name, quantity, group_id, active, ordering } = req.body;
            if (
                (quantity && !Number.isInteger(quantity)) ||
                (ordering && !Number.isInteger(ordering)) ||
                (name && name.length < 4)
            )
                return res.json(returnError(400, 'invalid input', {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { name, quantity, group_id, updated_at, updated_by, active };
            if (active === '1' || active === '0') data.active = active;
            if (ordering) data.ordering = ordering;
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

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            if (!isNumeric(id)) return res.json(returnError(400, 'invalid id', {}, req.path));
            const findCatById = await category.findByPk(id);
            if (!findCatById) return res.json(returnError(404, `can't find the category`, {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { updated_at, updated_by, active: 0 }
            await category.update(data, { where: { category_id: id } });
            return res.json(returnSuccess(200, 'deleted category successfully!', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    }
}