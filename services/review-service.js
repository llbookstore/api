
const { Op } = require('sequelize');
//db
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { review, account, book, bill, bill_detail } = db.initModels(sequelize);
//config
const normalConfig = require('../config/normal');
const { returnSuccess, returnError, getCurrentTimestamp, isNumeric } = require('../utils/common');

async function updateBookRating(book_id) {
    const findBook = await book.findOne({
        where: {
            book_id
        },
        include: [{
            model: review,
            as: 'reviews'
        }]
    });
    //recalculation rating product;
    let bookRating = 0;
    let totalNumberRating = 0;
    if (findBook.reviews.length > 0) {
        for (const item of findBook.reviews) {
            if (item.status === 1) {
                bookRating += item.rating;
                totalNumberRating = totalNumberRating + 1;
            }
        }
    }
    if (totalNumberRating !== 0) {
        bookRating = bookRating / totalNumberRating;
        bookRating = Number.parseFloat(bookRating).toFixed(2);
    }
    if (bookRating === 0) bookRating = null;

    await book.update(
        {
            rating: bookRating
        },
        {
            where: {
                book_id: book_id
            }
        },
    )
}
module.exports = {
    async getReviews(req, res, next) {
        try {
            let { book_id, acc_id, current_page, row_per_page, rating, status } = req.query;
            const limit = parseInt(row_per_page) || normalConfig.row_per_page;
            let offset = 0;
            if (isNumeric(current_page)) {
                offset = (parseInt(current_page) - 1) * limit;
            }
            const condition = {};
            if (book_id) condition.book_id = book_id;
            if (acc_id) condition.acc_id = acc_id;
            if (rating) condition.rating = rating;
            if (status) condition.status = status;

            const getAllReview = await review.findAndCountAll({
                where: condition,
                limit: limit,
                offset: offset,
                order: [['created_at', 'DESC']],
            });
            return res.json(returnSuccess(200, 'OK', getAllReview, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async addReviews(req, res, next) {
        try {
            let { acc_id, book_id, comment, full_name, rating } = req.body;
            //validate
            if (!acc_id || !book_id || !rating || rating > 5 || rating < 0)
                return res.json(returnError(400, 'invalid input', {}, req.path));
            const findAcc = await account.findByPk(acc_id);
            if (!findAcc) return res.json(returnError(404, `can't find this account`));
            const findBook = await book.findOne({
                where: {
                    book_id
                },
                include: [{
                    model: review,
                    as: 'reviews'
                }]
            });
            if (!findBook) return res.json(returnError(404, `can't find this book`));
            const created_at = getCurrentTimestamp();
            //find bill
            //user must buy this book to review this book.
            const findBill = await bill.findAll({
                where: {
                    user_id: acc_id
                },
                include: [
                    {
                        model: bill_detail,
                        as: 'bill_details',
                        where: {
                            book_id: book_id
                        }
                    }
                ],
            });
            if (!findBill.find(item => item.status === 3)) //3 is status success
                res.json(returnSuccess(401, `you don't have permission to do this`, {}, req.path));
            const data = { acc_id, book_id, comment, full_name, rating, created_at };
            const creReview = await review.create(data);
            return res.json(returnSuccess(200, 'added a review successfully', creReview, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },

    async removeReview(req, res, next) {
        try {
            const { review_id } = req.params;
            const findReview = await review.findByPk(review_id);
            if (!findReview) return res.json(returnError(404, `can't find this review`));
            await review.destroy(
                {
                    where: {
                        review_id
                    }
                });
            const { book_id, status } = findReview;
            if (status === 1) {
                updateBookRating(book_id);
            }
            return res.json(returnSuccess(200, 'remove a review successfully', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    },
    async acceptReview(req, res, next) {
        try {
            const { review_id } = req.params;
            const findReview = await review.findByPk(review_id);
            if (!findReview) return res.json(returnError(404, `can't find this review`));
            const accepted_at = getCurrentTimestamp();
            const accepted_by = req.userData.username;
            await review.update(
                {
                    status: 1,
                    accepted_at,
                    accepted_by
                },
                {
                    where: {
                        review_id
                    }
                });
            const { book_id } = findReview;
            updateBookRating(book_id);
            return res.json(returnSuccess(200, 'accept review successfully', {}, req.path));
        } catch (err) {
            console.log(err);
            return res.json(returnError(500, err.message, {}, req.path));
        }
    }
}
