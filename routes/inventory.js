require('dotenv').config();
const express = require('express');
const router = express.Router();
const connection = require('./../connection');


router.get('', (req, res) => {
    connection.query('SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.notes  FROM products p JOIN product_type pt ON pt.id = p.type_id'
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send(sqlres);
        });
});


module.exports = router;