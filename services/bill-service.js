//sequelize
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const normalConfig = require('../config/normal');
const { bill, bill_detail, account, book } = db.initModels(sequelize);

const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
module.exports = {

    async getBills(req, res, next) {
        try {
            let {
                q = '',
                current_page,
                row_per_page,
                user_id,
                status,
                active,
                date_start,
                date_end
            } = req.query;
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page)) {
                offset = (parseInt(current_page) - 1) * limit;
            }
            const condition = {
                [Op.or]: [
                    { user_name: { [Op.substring]: q } },
                    { bill_id: { [Op.substring]: q } },
                    { phone: { [Op.substring]: q } }
                ]
            };
            if (user_id) condition.user_id = user_id;
            if (status) condition.status = status;
            if (active) condition.active = active;
            if (date_start) condition.created_at = { [Op.gte]: date_start };
            if (date_end) condition.created_at = { [Op.lte]: date_end };
            if (date_start && date_end) {
                condition.created_at = { [Op.between]: [dateToTimestamp(date_start), dateToTimestamp(date_end)] };
            }
            const getBills = await bill.findAndCountAll({
                where: condition,
                limit: limit,
                offset: offset,
                order: [['created_at', 'DESC']],
                distinct: true,
                include: [
                    {
                        model: bill_detail,
                        attributes: ['book_id', 'quantity', 'price'],
                        as: 'bill_details',
                        include: [{
                            model: book,
                            attributes: ['name', 'cover_image'],
                            as: 'book'
                        }]
                    },
                ],
            });
            return res.json(returnSuccess(200, 'OK', getBills, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },
    async getBillById(req, res, next) {
        try {
            const { id } = req.params;
            const { user_id } = req.query;
            const condition = {
                bill_id: id
            };
            if (user_id) condition.user_id = user_id;
            const findBillById = await bill.findOne({
                where: condition,
                include: [
                    {
                        model: bill_detail,
                        attributes: ['book_id', 'quantity', 'price'],
                        as: 'bill_details',
                        include: [{
                            model: book,
                            attributes: ['name', 'cover_image', 'book_id'],
                            as: 'book'
                        }]
                    },
                ],

            });
            return res.json(returnSuccess(200, 'OK', findBillById, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async addBill(req, res, next) {
        try {
            const { user_name, phone, address, user_note, payment_method, total_price, user_id } = req.body;
            console.log(user_name, phone, address, user_note, payment_method, total_price, user_id)
            if (!user_name || !phone || !address || payment_method > 3 || !total_price || !user_id)
                return res.json(returnError(410, 'invalid input', {}, req.path));
            const findUser = await account.findByPk(user_id);
            if (!findUser) return res.json(returnError(404, `can't find user account`, {}, req.path));

            const created_at = getCurrentTimestamp();
            const data = { user_name, phone, address, user_note, payment_method, total_price, created_at, user_id };
            //validation
            try {
                const item = await bill.build(data);
                await item.validate();
            } catch (err) {
                return res.json(returnError('400', err.message, {}, req.path));
            }
            const result = await bill.create(data);
            return res.json(returnSuccess(200, 'add a bill successful', result, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async addBillDetail(req, res, next) {
        try {
            const { id } = req.params;
            if (!isNumeric(id)) return res.json(returnError(401, 'invalid params', {}, req.path));
            const findBill = await bill.findByPk(id);
            if (!findBill) return res.json(returnError(404, `can't find this bill`, {}, req.path));
            const { book_id, quantity, price } = req.body;
            if (!Number.isInteger(book_id) || !Number.isInteger(quantity) || !Number.isInteger(price))
                return res.json(returnError(401, 'invalid input', {}, req.path));

            const findBook = await book.findByPk(book_id);
            if (!findBook) return res.json(returnError(404, `can't find this book`, {}, req.path));
            const data = { bill_id: id, book_id, quantity, price };
            const result = await bill_detail.create(data);
            return res.json(returnSuccess(200, 'OK', result, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async handleBill(req, res, next) {
        try {
            const { id } = req.params;
            const { status, note = '', is_paid } = req.body;
            const findBillById = await bill.findByPk(id);
            if (!findBillById) {
                return res.json(returnError(404, `can't find this bill`, {}, req.path));
            }
            const { handle_history } = findBillById;
            const handleAt = getCurrentTimestamp();
            const { userId, username } = req.userData;
            const adminHandle = {
                admin_id: userId,
                admin_name: username,
                note,
                status,
                is_paid,
                handled_at: handleAt
            }
            const newHandleHistory = handle_history ? [...JSON.parse(handle_history), adminHandle] : [adminHandle];
            const updateBillHistory = { status, handle_history: JSON.stringify(newHandleHistory) };
            if (is_paid === 1) {
                updateBillHistory.is_paid = is_paid;
                updateBillHistory.paid_time = getCurrentTimestamp();
            }
            await bill.update(updateBillHistory, { where: { bill_id: id } });
            if (status == 3) {
                const getAllBillDetails = await bill_detail.findAll({
                    where: {
                        bill_id: id
                    }
                });
                for (const item of getAllBillDetails) {
                    const getBook = await book.findByPk(item.book_id);
                    await book.update({
                        quantity: getBook.quantity - item.quantity
                    }, {
                        where: {
                            book_id: item.book_id
                        }
                    })
                }
            }
            return res.json(returnSuccess(200, 'handle bill successful', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, req.path));
        }
    },

    async revenueStat(req, res, next) {
        try {
            const {
                date_start,
                date_end
            } = req.body;
            if (!date_start || !date_end) return res.json(returnError(401, 'invalid input', {}, req.path));
            const getBills = await bill.findAll({
                attributes: ['bill_id', 'payment_method', 'total_price', 'created_at', 'status'],
                where: {
                    created_at: {
                        [Op.between]: [date_start, date_end]
                    },
                    status: 3
                }
            })
            return res.json(returnSuccess(200, 'ok', getBills, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async revenueCodStat(req, res, next) {
        try {
            const {
                date_start,
                date_end
            } = req.body;
            if (!date_start || !date_end) return res.json(returnError(401, 'invalid input', {}, req.path));
            const getBills = await bill.findAll({
                attributes: ['bill_id', 'payment_method', 'total_price', 'created_at', 'status'],
                where: {
                    created_at: {
                        [Op.between]: [date_start, date_end]
                    },
                   //payment_method: 0
                }
            })
            return res.json(returnSuccess(200, 'ok', getBills, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },
}