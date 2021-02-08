require('dotenv').config();
const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT,
    define: {
        timestamps: false,
        freezeTableName: true
    }
}, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});
//test connection
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.log('Unable to connect the database: ' + err));
sequelize.sync();
module.exports = sequelize;