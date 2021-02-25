require('dotenv').config();
const express = require('express');
const router = express.Router();
const connection = require('./../connection');

router.get('', (req, res) => {
    connection.query('SELECT * FROM product_type'
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send(sqlres);
        });
});

router.post('', (req, res) => {
    const newType = req.body.data;
    connection.query(`INSERT INTO product_type (type) VALUES ('${newType}')`
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send();
        });
});


module.exports = router;