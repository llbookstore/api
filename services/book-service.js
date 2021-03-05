
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { book, author, sale } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
const timeRegex = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$');

module.exports = {

    async getBooks(req, res, next) {
        try {
            const { q = '', price_lte, price_gte, row_per_page, current_page, active, status } = req.query;
            //q - query -> name, author-name, publish_house,
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page)) {
                offset = (parseInt(current_page) - 1) * limit;
            }
            const condition = {
                [Op.or]: [
                    { name: { [Op.substring]: q } },
                    { publishing_house: { [Op.substring]: q } },
                    { description: { [Op.substring]: q } },
                    { '$author.name$': { [Op.substring]: q } },
                ]
            };
            if (price_gte && isNumeric(price_gte))
                condition.price = { [Op.gte]: price_gte }
            if (price_lte && isNumeric(price_lte))
                condition.price = { [Op.lte]: price_lte }
            if (active && (active == 0 || active == 1))
                condition.active = active;
            if (status && status >= 0)
                condition.status = status;

            const findBook = await book.findAndCountAll({
                where: condition,
                limit: limit,
                offset: offset,
                include: [{
                    model: author,
                    as: 'author'
                },
                {
                    model: sale,
                    as: 'sale'
                }]
            });
            return res.json(returnSuccess(200, 'OK', findBook, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async getBookById(req, res, next) {
        try {
            const { id } = req.params;
            const findBook = await book.findOne({
                where: { book_id: id },
                include: [{
                    model: author,
                    as: 'author'
                },
                {
                    model: sale,
                    as: 'sale'
                }]
            });
            if (!findBook) return res.json(returnError(404, `can't find this book`, {}, req.path));
            return res.json(returnSuccess(200, 'OK', findBook, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, path));
        }
    },

    async addBook(req, res, next) {
        try {
            const { name, author_id, description, pages, dimension, weight, published_date, publishing_house, format, book_translator, quantity, price, sale_id, status } = req.body;
            let cover_image;
            if (req.file) cover_image = req.file.filename;
            const created_at = getCurrentTimestamp();
            const created_by = req.userData.username;
            const data = {
                name,
                cover_image,
                description,
                pages,
                dimension,
                weight,
                publishing_house,
                format,
                book_translator,
                quantity,
                price,
                status,
                created_at,
                created_by
            };
            if (!!author_id) {
                const findAuthor = await author.findByPk(author_id);
                if (!findAuthor) return res.json(returnError(404, `author_id doesn't exist`, {}, req.path));
                data.author_id = author_id;
            }
            if (!!sale_id) {
                const findSale = await sale.findByPk(sale_id);
                if (!findSale) return res.json(returnError(404, `sale_id doesn't exist`, {}, req.path));
                data.sale_id = sale_id;
            }
            if (published_date) {
                if (!timeRegex.test(published_date))
                    return res.json(returnError(400, 'invalid input date', {}, req.path));
                else data.published_date = dateToTimestamp(published_date, 'MM-DD-YYYY');
            }
            try {
                const item = await book.build(data);
                await item.validate();
            } catch (err) {
                return res.json(returnError(500, err.message, {}, req.path));
            }
            await book.create(data);
            return res.json(returnSuccess(200, 'add a book successful!', data, req.path))
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const findBookById = await book.findByPk(id);
            if (!findBookById) return res.json(returnError(404, `this book doesn't exist`, {}, req.path));
            const {
                name = findBookById.name,
                author_id,
                description,
                pages = findBookById.pages,
                dimension,
                weight,
                published_date,
                publishing_house,
                format,
                book_translator,
                quantity,
                price = findBookById.price,
                sale_id,
                active,
                status
            } = req.body;
            let cover_image;
            if (req.file) cover_image = req.file.filename;
            const updated_at = getCurrentTimestamp();
            const updated_by = req.userData.username;
            const data = {
                name,
                cover_image,
                description,
                pages,
                dimension,
                weight,
                publishing_house,
                format,
                book_translator,
                quantity,
                price,
                status,
                active,
                updated_at,
                updated_by
            };
            if (!!author_id) {
                const findAuthor = await author.findByPk(author_id);
                if (!findAuthor) return res.json(returnError(404, `author_id doesn't exist`, {}, req.path));
                data.author_id = author_id;
            }
            if (!!sale_id) {
                const findSale = await sale.findByPk(sale_id);
                if (!findSale) return res.json(returnError(404, `sale_id doesn't exist`, {}, req.path));
                data.sale_id = sale_id;
            }
            if (published_date) {
                if (!timeRegex.test(published_date))
                    return res.json(returnError(400, 'invalid input date', {}, req.path));
                else data.published_date = dateToTimestamp(published_date, 'MM-DD-YYYY');
            }
            try {
                const item = await book.build(data);
                await item.validate();
            } catch (err) {
                return res.json(returnError(500, err.message, {}, req.path));
            }
            await book.update(data, { where: { book_id: id } });
            return res.json(returnSuccess(200, 'update book successful!', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },
}