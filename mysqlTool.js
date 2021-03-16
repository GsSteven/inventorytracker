const connection = require('./connection');

const mysqlTool = {
    getTypeId(type) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT id FROM product_type WHERE type = '${type}'`
                , (err, sqlres) => {
                    if (err) reject(err);
                    resolve(sqlres[0].id);
                });
        });
    },

}

module.exports = mysqlTool;