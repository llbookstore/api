
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { advisory } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, isNumeric } = require('../utils/common');

module.exports = {
    async getAdvisory(req, res, next) {
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
                distinct:true,
                order: [['advisory_id', 'DESC']],
            });
            get_advisory.rows.map(item => {
                if (item.dataValues.created_at)
                    item.dataValues.created_at = timestampToDate(item.dataValues.created_at, 'DD/MM/YYYY LT');
                return item;
            })

            return res.json(returnSuccess(200, 'OK', get_advisory, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async requestAdvisory(req, res, next) {
        const path = req.path;
        try {
            const { username, phone, user_note, address } = req.body;
            if (!username || !phone || !user_note) return res.json(returnError(500, 'invalid input', {}, path));
            const advisoryData = { username, phone, user_note, address };
            try {
                const item = await advisory.build(advisoryData);
                const validatedItem = await item.validate();
            } catch (err) {
                console.log(err);
                return res.json(returnError('500', err.message, {}, path));
            }

            advisoryData.created_at = getCurrentTimestamp();
            const advisory_new = await advisory.create(advisoryData);
            return res.json(returnSuccess(200, 'request a advisory', advisory_new, path))

        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, path));

        }
    },

    async responseAdvisory(req, res, next) {
        try {
            const { id } = req.params;
            const { status, note = ''} = req.body;
            if (status < 0) {
                return res.json(returnError(500, 'invalid input', {}, req.path));
            }
            const { userId, username } = req.userData;
            const findAdvisoryWithId = await advisory.findOne({ where: { advisory_id: id } });
            if (!findAdvisoryWithId) {
                return res.json(returnError(500, 'can not find this advisory', {}, req.path));
            }

            let { handle_history } = findAdvisoryWithId;
            const handleAt = getCurrentTimestamp();
            const handleAdvisory = {
                admin_id: userId,
                admin_name: username,
                note,
                status,
                handled_at: handleAt
            }
            const newHandleHistory = handle_history ? [...JSON.parse(handle_history), handleAdvisory] : [handleAdvisory];
            const updateAdvisory = { status, handle_history: JSON.stringify(newHandleHistory) };

            const resAdvisory = await advisory.update(updateAdvisory, { where: { advisory_id: id } });
            return res.json(returnSuccess(200, 'ok', resAdvisory, req.path));

        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    }
}