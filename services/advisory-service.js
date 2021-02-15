
const {Op} = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { advisory } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
const timeRegex = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$');

module.exports = {
    async getAdvisory(req, res, next){
        try {
            let { q = '', time_start, time_end, status, current_page, row_per_page } = req.query;
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page)) {
                offset = (parseInt(current_page) - 1) * limit;
            }

            const condition = {
                [Op.or]: [
                    { username: { [Op.substring]: q } },
                    { phone: { [Op.substring]: q } }, 
                ]
            };

            if (status && status > -1) condition.status = status;
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

            const get_advisory = await advisory.findAndCountAll({
                where: condition,
                limit: limit,
                offset: offset,
                order: [['advisory_id', 'DESC']],
            });
            get_advisory.rows.map(item => {
                item.dataValues.created_at = timestampToDate(item.dataValues.created_at);
                return item;
            })

            return res.json(returnSuccess(200,'OK',get_advisory,req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500,err.message, {}, req.path));
        }
    }
}