
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { author } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');

module.exports = {
    async getAuthors(req, res, next) {
        try {
            let { q = '', current_page, row_per_page, active } = req.query;
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page)) {
                offset = (parseInt(current_page) - 1) * limit;
            }

            const condition = {
                [Op.or]: [
                    { name: { [Op.substring]: q } },
                    { author_id: { [Op.substring]: q } }
                ]
            };

            if (active === '1' || active === '0') condition.active = active;
            const getAllAuthors = await author.findAndCountAll({
                where: condition,
                limit: limit,
                offset: offset,
                distinct:true,
                order: [['author_id', 'DESC']],
            });
            getAllAuthors.rows.map(item => {
                if (item.dataValues.created_at)
                    item.dataValues.created_at = timestampToDate(item.dataValues.created_at, 'DD/MM/YYYY');
                if (item.dataValues.updated_at)
                    item.dataValues.updated_at = timestampToDate(item.dataValues.updated_at, 'DD/MM/YYYY');
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
                if (findAuthorById.created_at)
                    findAuthorById.created_at = timestampToDate(findAuthorById.created_at);
                if (findAuthorById.updated_at)
                    findAuthorById.updated_at = timestampToDate(findAuthorById.updated_at);
            }
            return res.json(returnSuccess(200, 'OK', findAuthorById, path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, path));
        }
    },

    async addAuthor(req, res, next) {
        try {
            let { name = '', avatar, description, avatar_file_name } = req.body;
            if (name.length < 4) return res.json(returnError(400, 'invalid input', {}, req.path));
            if (req.file) avatar = req.file.filename;
            else if (avatar_file_name) image = avatar_file_name;
            const created_at = getCurrentTimestamp();
            const created_by = req.userData.username;
            const data = { name, avatar, description, created_at, created_by };
            const creAuthor = await author.create(data);
            return res.json(returnSuccess(200, 'added a new author', creAuthor, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async updateAuthor(req, res, next) {
        try {
            const { id } = req.params;
            if (!isNumeric(id)) return res.json(returnError(400, 'invalid id', {}, req.path));
            const findAuthorById = await author.findOne({
                where: {
                    author_id: id,
                }
            });
            if (!findAuthorById) return res.json(returnError(404, 'can not find the author', {}, req.path));
            let { name, avatar, description, avatar_file_name } = req.body;

            if (name && name.length < 4) return res.json(returnError(400, 'invalid input', {}, req.path));
            if (req.file) avatar = req.file.filename;
            else if (avatar_file_name) avatar = avatar_file_name;
            else avatar = findAuthorById.avatar;
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

    async deleteAuthor(req, res, next) {
        try {
            const { id } = req.params;
            const findAuthor = await author.findByPk(id);
            if (!findAuthor) return res.json(returnError(404, `can't find the author`, {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { updated_at, updated_by, active: 0 }
            await author.update(data, { where: { author_id: id } });
            return res.json(returnSuccess(200, 'deleted author successfully!', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async restoreAuthor(req, res, next) {
        try {
            const { id } = req.params;
            const findAuthor = await author.findByPk(id);
            if (!findAuthor) return res.json(returnError(404, `can't find the author`, {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { updated_at, updated_by, active: 1 }
            await author.update(data, { where: { author_id: id } });
            return res.json(returnSuccess(200, 'deleted author successfully!', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    }
}