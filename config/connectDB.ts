import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config()
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;
const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASS!, {
    host: DB_HOST!,
    dialect: 'mysql',
    port: parseInt(DB_PORT!),
    define: {
        timestamps: false,
        freezeTableName: true
    },
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    }
});
//test connection
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((err: any) => console.log('Unable to connect the database: ' + err));
sequelize.sync();

export default sequelize;