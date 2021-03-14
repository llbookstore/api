
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { book, author, sale, publishing_house, category_detail, favourite, cart } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, dateToTimestamp, isNumeric } = require('../utils/common');
const timeRegex = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$');

module.exports = {

    async getBooks(req, res, next) {
        try {
            const {
                q = '',
                // publishing_id,
                // author_id,
                price_lte,
                price_gte,
                row_per_page,
                current_page,
                active,
                status
            } = req.query;
            //q - query -> name, author-name, publish_house,
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page)) {
                offset = (parseInt(current_page) - 1) * limit;
            }
            const condition = {
                [Op.or]: [
                    { name: { [Op.substring]: q } },
                    // { '$publishing.name$': { [Op.substring]: q } },
                    { description: { [Op.substring]: q } },
                    // { '$author.name$': { [Op.substring]: q } },
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
            //
            // if (publishing_id) condition['$publishing.publishing_id$'] = publishing_id;
            // if (author_id) condition['$author.author_id$'] = author_id;
            const findBook = await book.findAndCountAll({
                where: condition,
                limit: limit,
                offset: offset,
                include: [
                    {
                        model: author,
                        as: 'author',
                        // required: true,
                    },
                    {
                        model: sale,
                        as: 'sale',
                        // required: true,
                    },
                    {
                        model: publishing_house,
                        as: 'publishing',
                        // required: true,
                    },
                    {
                        model: category_detail,
                        as: 'category_details',
                        attributes: ['category_id'],
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
                    model: publishing_house,
                    as: 'publishing',
                },
                {
                    model: category_detail,
                    as: 'category_details',
                    attributes: ['category_id'],
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
            const {
                name,
                author_id,
                description,
                pages,
                dimension,
                weight,
                publisher,
                published_date,
                publishing_id,
                format,
                book_translator,
                quantity,
                price,
                sale_id,
                status,
                language
            } = req.body;
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
                format,
                book_translator,
                quantity,
                price,
                status,
                created_at,
                created_by,
                language,
                publisher
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
            if (!!publishing_id) {
                const findPub = await publishing_house.findByPk(publishing_id);
                if (!findPub) return res.json(returnError(404, `publishing_id doesn't exist`, {}, req.path));
                data.publishing_id = publishing_id;
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
            const creBook = await book.create(data);
            console.log(creBook.book_id);
            return res.json(returnSuccess(200, 'add a book successful!', creBook, req.path))
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            if(!isNumeric(id)) return res.json(returnError(400,'invalid id', {}, req.path));
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
                format,
                book_translator,
                quantity,
                price = findBookById.price,
                sale_id,
                active,
                status,
                publishing_id,
                publisher,
                language
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
                format,
                book_translator,
                quantity,
                price,
                status,
                active,
                updated_at,
                updated_by,
                publisher,
                language
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
            if (!!publishing_id) {
                const findPub = await publishing_house.findByPk(publishing_id);
                if (!findPub) return res.json(returnError(404, `publishing_id doesn't exist`, {}, req.path));
                data.publishing_id = publishing_id;
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

    async addBookCategories(req, res, next) {
        try {
            const { id } = req.params;
            if(!isNumeric(id)) return res.json(returnError(400,'invalid id', {}, req.path));
            const findBookById = await book.findByPk(id);
            if (!findBookById) return res.json(returnError(404, `can't find this book`, {}, req.path));

            const { category } = req.body;
            if (!category) return res.json(returnError(400, 'invalid input', {}, req.path));
            if (typeof category === 'object' && Array.isArray(category)) {
                await category_detail.destroy({ where: { book_id: id } });
                for (let item of category) {
                    await category_detail.create({ book_id: id, category_id: item });
                }
            }

            return res.json(returnSuccess(200, `added book's categories successful!`, {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async addFavourite(req, res, next) {
        try {
            const { bookId } = req.params;
            if(!isNumeric(bookId)) return res.json(returnError(400,'invalid id', {}, req.path));
            const findBookById = book.findByPk(bookId);
            if (!findBookById) return res.json(returnError(404, `can't find this book`, {}, req.path));
            const { userId } = req.userData;
            const data = { book_id: bookId, acc_id: userId };
            const createFavourite = await favourite.create(data);
            return res.json(returnSuccess(200, 'add favourite successful!', createFavourite, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async removeFavourite(req, res, next) {
        try {
            const { bookId } = req.params;
            if(!isNumeric(bookId)) return res.json(returnError(400,'invalid id', {}, req.path));
            const findBookById = book.findByPk(bookId);
            if (!findBookById) return res.json(returnError(404, `can't find this book`, {}, req.path));
            const { userId } = req.userData;
            await favourite.destroy({ where: { book_id: bookId, acc_id: userId } });
            return res.json(returnSuccess(200, 'delete favourite successful!', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async addCart(req, res, next) {
        try {
            const { bookId } = req.params;
            if(!isNumeric(bookId)) return res.json(returnError(400,'invalid id', {}, req.path));
            const findBookById = await book.findByPk(bookId);
            if (!findBookById) return res.json(returnError(404, `can't find this book`, {}, req.path));

            const { quantity } = req.body;
            if (Number.isNaN(quantity)) return res.json(returnError(401, 'invalid input', {}, req.path));
            if(quantity > findBookById.quantity) return res.json(returnError(400,'over book quantity', {}, req.path));
            const { userId } = req.userData;
            const findCart = await cart.findOne({ where: { book_id: bookId, acc_id: userId } });
            let createCart;
            if (findCart) {
                createCart = await cart.update({ quantity }, { where: { book_id: bookId, acc_id: userId } })
            }
            else {
                const data = { book_id: bookId, acc_id: userId, quantity };
                createCart = await cart.create(data);
            }
            return res.json(returnSuccess(200, 'add book to cart successful!', createCart, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async removeCart(req, res, next) {
        try {
            const { bookId } = req.params;
            if(!isNumeric(bookId)) return res.json(returnError(400,'invalid id', {}, req.path));
            const findBookById = await book.findOne({where: {book_id: bookId}});
            if (!findBookById) return res.json(returnError(404, `can't find this book`, {}, req.path));
            const { userId } = req.userData;
            const data = { book_id: bookId, acc_id: userId };
            const rmCart = await cart.destroy({where: data});
            return res.json(returnSuccess(200, 'remove book to cart successful!', rmCart, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },


}