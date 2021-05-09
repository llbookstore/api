//db
const { Op } = require('sequelize');
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { publishing_house } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, isNumeric } = require('../utils/common');


module.exports = {
    async getPublishingHouses(req, res, next) {
        try {
            const { q = '', active, row_per_page, current_page } = req.query;
            const condition = {
                [Op.or]: [
                    { name: { [Op.substring]: q } },
                    { publishing_id: { [Op.substring]: q } }
                ]
            };
            if (active === '1' || active === '0') condition.active = active;
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page) && current_page > 0) {
                offset = (parseInt(current_page) - 1) * limit;
            }
            const data = await publishing_house.findAndCountAll({
                where: condition,
                limit,
                offset,
                distinct: true
            });
            return res.json(returnSuccess(200, 'OK', data, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async getOnePublishingHouse(req, res, next) {
        try {
            const { id } = req.params;
            const data = await publishing_house.findByPk(id);
            return res.json(returnSuccess(200, 'OK', data, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async addPublishingHouse(req, res, next) {
        try {
            const { name, description, logo_file_name } = req.body;
            if (!name) return res.json(returnError(401, 'invalid input', {}, req.path));
            const findPubByName = await author.findOne({
                where: {
                    name: name.trim()
                }
            });
            if (findPubByName)
                return res.json(returnError(401, `Tên nhà phát hành này đã tồn tại`, {}, req.path));
            let image;
            if (req.file) image = req.file.filename;
            else if (logo_file_name) image = logo_file_name;
            const created_at = getCurrentTimestamp();
            const created_by = req.userData.username;
            const data = { name, description, image, created_at, created_by };
            const crePublishing = await publishing_house.create(data);
            return res.json(returnSuccess(200, 'created a publishing_house', crePublishing, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async updatePublishingHouse(req, res, next) {
        try {
            const { id } = req.params;
            if (!isNumeric(id)) return res.json(returnError(400, 'invalid id', {}, req.path));
            const findPub = await publishing_house.findByPk(id);
            if (!findPub) return res.json(returnError(404, `can't find this publishing_house`, {}, req.path));
            const { name, description, logo_file_name } = req.body;
            const image = req.file ? req.file.filename : (logo_file_name ? logo_file_name : findPub.image);
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { name, image, description, updated_at, updated_by };
            await publishing_house.update(data, { where: { publishing_id: id } });
            return res.json(returnSuccess(200, 'updated!', data, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async deletePublishingHouse(req, res, next) {
        try {
            const { id } = req.params;
            const findPub = await publishing_house.findByPk(id);
            if (!findPub) return res.json(returnError(404, `can't find the publishing_house`, {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { updated_at, updated_by, active: 0 }
            await publishing_house.update(data, { where: { publishing_id: id } });
            return res.json(returnSuccess(200, 'deleted publishing_house successfully!', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async restorePublishingHose(req, res, next) {
        try {
            const { id } = req.params;
            const findPub = await publishing_house.findByPk(id);
            if (!findPub) return res.json(returnError(404, `can't find the publishing_house`, {}, req.path));
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { updated_at, updated_by, active: 1 }
            await publishing_house.update(data, { where: { publishing_id: id } });
            return res.json(returnSuccess(200, 'deleted publishing_house successfully!', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    }
}