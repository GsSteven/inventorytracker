const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'inventory'
});


module.exports = connection;