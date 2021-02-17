
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { author } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
const timeRegex = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$');

module.exports = {
    async getAuthors(req, res, next) {
        try {
            let { q = '', time_start, time_end, current_page, row_per_page } = req.query;
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page)) {
                offset = (parseInt(current_page) - 1) * limit;
            }

            const condition = {
                [Op.or]: [{ name: { [Op.substring]: q } }]
            };

            //find by time
            if (time_start) {
                if (!timeRegex.test(time_start)) return res.json(returnError('400', 'date invalid', {}, req.path));
                time_start = dateToTimestamp(time_start);
            }
            if (time_end) {
                if (!timeRegex.test(time_end)) return res.json(returnError('400', 'date invalid', {}, req.path));
                time_end = dateToTimestamp(time_end);
            }
            if (time_start && time_end) {
                condition.created_at = { [Op.between]: [parseInt(time_start), parseInt(time_end)] }
            }
            else if (time_start) {
                condition.created_at = { [Op.gte]: parseInt(time_start) }
            }
            else if (time_end) {
                condition.created_at = { [Op.lte]: parseInt(time_end) }
            }

            const getAllAuthors = await author.findAndCountAll({
                where: condition,
                limit: limit,
                offset: offset,
                order: [['author_id', 'DESC']],
            });
            getAllAuthors.rows.map(item => {
                item.dataValues.created_at = timestampToDate(item.dataValues.created_at);
                item.dataValues.updated_at = timestampToDate(item.dataValues.updated_at);
                return item;
            })

            return res.json(returnSuccess(200, 'OK', getAllAuthors, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },
    async getAuthorById(req, res, next) {
        const path = req.path;
        try {
            const { id } = req.params;
            const findAuthorById = await author.findOne({
                where: {
                    author_id: id,
                }
            });
            if (findAuthorById) {
                findAuthorById.created_at = timestampToDate(findAuthorById.created_at);
                findAuthorById.updated_at = timestampToDate(findAuthorById.updated_at);
            }
            if (!findAuthorById)
                return res.json(returnSuccess(200, 'Can not find this author', findAuthorById, path));
            return res.json(returnSuccess(200, 'OK', findAuthorById, path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, path));
        }
    },

    async addAuthor(req, res, next) {
        try {
            let { name = '', avatar, description } = req.body;
            if (name.length < 4) return res.json(returnError(400, 'invalid input', {}, req.path));
            if (req.file) avatar = req.file.filename;
            const created_at = getCurrentTimestamp();
            const created_by = req.userData.username;
            const data = { name, avatar, description, created_at, created_by };
            await author.create(data);
            return res.json(returnSuccess(200, 'added a new author', data, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async updateAuthor(req, res, next) {
        try {
            const { id } = req.params;
            const findAuthorById = await author.findOne({
                where: {
                    author_id: id,
                }
            });
            if(!findAuthorById) return res.json(returnError(404,'can not find the author', {}, req.path));
            let { name, avatar, description } = req.body;
            
            if (name && name.length < 4) return res.json(returnError(400, 'invalid input', {}, req.path));
            if (req.file) avatar = req.file.filename;
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { name, avatar, description, updated_at, updated_by };
            await author.update(
                data,
                {
                    where: {
                        author_id: id
                    }
                });
            return res.json(returnSuccess(200, 'updated author', data, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },
}