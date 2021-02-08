//sequelize
const sequelize = require('../config/connectDB');
const db = require('../models/init-models');
const { account } = db.initModels(sequelize);
//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
//return respone
const { returnSuccess, returnError }  = require('../utils/common');
module.exports = {
    async addAuthor(req, res, next) {
        try {
            // const { username, fullname, password, email, birth_date, gender, type, created_by } = req.body;
            // console.log(req.path)
            // let result = await account.create({
            //     username,
            //     full_name: fullname,
            //     password,
            //     email,
            //     birth_date,
            //     gender,
            //     type,
            //     created_at,
            //     created_by
            // });
            try {
                // const hashedPassword = await bcrypt.hash('12345',saltRounds);
                const cmp = await bcrypt.compare('12345', '$2b$10$G7qFmnLNFd8lo9oBfoQrfuP26H9B2uuzYPoY9iF8nV1iAMe2qC6pe')
                console.log(cmp)
                // console.log(hashedPassword)
            } catch (err) {
                
            }
            res.json(returnSuccess(200,'OK',{},req.path));
        } catch (err) {
            console.log(err);
        }
    }
}
