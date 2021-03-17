require('dotenv').config();
const express = require('express');
const router = express.Router();
const connection = require('./../connection');
const mysqlTool = require('./../mysqlTool');

router.get('', (req, res) => {
    connection.query('SELECT * FROM product_type ORDER BY type'
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send(sqlres);
        });
});

router.post('', (req, res) => {
    const newType = req.body.data;
    //check if type already exists
    connection.query(`SELECT id FROM product_type WHERE type='${newType}'`,
        (err, sqlres) => {
            if (err) throw err;
            //if exists do not add to database
            if (!sqlres[0]) {
                connection.query(`INSERT INTO product_type (type) VALUES ('${newType}')`
                    , (err, sqlres) => {
                        if (err) throw err;
                        res.status(200).send();
                    });
            } else {
                res.status(200).send('type already exists');
            }
        });
});

router.put('', (req, res) => {

});

router.delete('', async (req, res) => {
    const nameToDelete = req.query.nameOfType;
    const idOfName = await mysqlTool.getTypeId(nameToDelete);
    //set all products with type being deleted to type of null
    connection.query(`UPDATE products SET type_id = null WHERE type_id = ${idOfName}`,
        (err, sqlres) => {
            if (err) throw err;
            //delete type
            connection.query(`DELETE FROM product_type WHERE type = '${nameToDelete}'`,
                (err, sqlres) => {
                    if (err) throw err;
                    res.status(200).send();
                });
        });
});


module.exports = router;