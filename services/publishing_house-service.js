//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { publishing_house } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
const timeRegex = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$');


module.exports = {
    async getPublishingHouses(req, res, next) {
        try {
            const { active } = req.query;
            const condition = {};
            if (active === '1' || active === '0') condition.active = active;
            const data = await publishing_house.findAll({ where: condition });
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
            const { name, description } = req.body;
            if (!name) return res.json(returnError(401, 'invalid input', {}, req.path));
            let image;
            if (req.file) image = req.file.filename;
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
            const findPub = await publishing_house.findByPk(id);
            if (!findPub) return res.json(returnError(404, `can't find this publishing_house`, {}, req.path));
            const { name, description, active } = req.body;
            const image = req.file ? req.file.filename : findPub.image;
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = { name, image, description, updated_at, updated_by };
            if (active === '1' || active === '0') data.active = active;
            await publishing_house.update(data, { where: { publishing_id: id } });
            return res.json(returnSuccess(200, 'updated!', data, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async deletePublishingHose(req, res, next) {
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
    }
}