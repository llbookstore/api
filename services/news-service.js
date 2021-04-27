
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { news } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, isNumeric } = require('../utils/common');

module.exports = {
    async getNews(req, res, next) {
        try {
            let { q = '', current_page, row_per_page, status } = req.query;
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page)) {
                offset = (parseInt(current_page) - 1) * limit;
            }

            const condition = {
                [Op.or]: [
                    { title: { [Op.substring]: q } },
                    { news_id: { [Op.substring]: q } }
                ]
            };

            if (status > -1) condition.status = status;
            const getAllNews = await news.findAndCountAll({
                where: condition,
                limit: limit,
                offset: offset,
                order: [['created_at', 'DESC']],
            });
            return res.json(returnSuccess(200, 'OK', getAllNews, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },
    async getNewsById(req, res, next) {
        const path = req.path;
        try {
            const { id } = req.params;
            const findNewsById = await news.findOne({
                where: {
                    news_id: id,
                }
            });
            return res.json(returnSuccess(200, 'OK', findNewsById, path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, path));
        }
    },

    async addNews(req, res, next) {
        try {
            let { title = '', summary, source, description = '', thumbnail, status } = req.body;
            if (title.length < 4 || !description || !summary) return res.json(returnError(400, 'invalid input', {}, req.path));
            const created_at = getCurrentTimestamp();
            const created_by = req.userData.username;
            const data = { title, thumbnail, summary, source, description, status, created_at, created_by };
            if(status === 1){
                data.published_at = created_at,
                data.published_by = created_by
            }
            const creNews = await news.create(data);
            return res.json(returnSuccess(200, 'added a news successfully', creNews, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async updateNews(req, res, next) {
        try {
            const { id } = req.params;
            const findNewsById = await news.findOne({
                where: {
                    news_id: id,
                }
            });
            if (!findNewsById) return res.json(returnError(404, 'can not find the news', {}, req.path));
            let {
                title = findNewsById.title,
                summary,
                description,
                thumbnail = findNewsById.thumbnail,
                source,
                status
            } = req.body;
            if (title.length < 4) return res.json(returnError(400, 'invalid input', {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { title, summary, thumbnail, description, source, status, updated_at, updated_by };
            if (status === 1 && status !== findNewsById.status){ //publish
                data.published_at = updated_at;
                data.published_by = updated_by;
            }
            await news.update(
                data,
                {
                    where: {
                        news_id: id
                    }
                });
        return res.json(returnSuccess(200, 'updated news', data, req.path));
    } catch(err) {
        console.log(err);
        return res.json(returnError(500, err.message, {}, req.path));
    }
}
}