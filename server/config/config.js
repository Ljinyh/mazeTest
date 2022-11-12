require('dotenv').config();

module.exports = {
    development: {
        username: "jiny",
        password: process.env.PASS,
        host: process.env.HOST,
        database: process.env.DATABASE,
        dialect: "mysql",
    },

    production: {
        username: process.env.USER,
        password: process.env.PASS,
        host: process.env.HOST,
        database: process.env.DATABASE,
        dialect: "mysql",
        port: '3306'
    }
};