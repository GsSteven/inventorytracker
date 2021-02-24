require('dotenv').config();
const express = require('express');
const router = express.Router();
const connection = require('./../connection');


router.get('', (req, res) => {
    connection.query('SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.location, p.notes  FROM products p JOIN product_type pt ON pt.id = p.type_id'
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send(sqlres);
        });
});

router.get('/orderBy', (req, res) => {
    const orderQuery = req.query.orderBy;
    const searchQuery = req.query.searchQuery;
    if (searchQuery) {
        connection.query(`SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.location, p.notes  FROM products p JOIN product_type pt ON pt.id = p.type_id WHERE name LIKE "%${searchQuery}%" ORDER BY ${orderQuery}`
            , (err, sqlres) => {
                if (err) throw err;
                res.status(200).send(sqlres);
            });
    } else {
        connection.query(`SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.location, p.notes  FROM products p JOIN product_type pt ON pt.id = p.type_id ORDER BY ${orderQuery}`
            , (err, sqlres) => {
                if (err) throw err;
                res.status(200).send(sqlres);
            });
    }
});

router.get('/search', (req, res) => {
    const searchQuery = req.query.searchQuery;
    connection.query(`SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.location, p.notes  FROM products p JOIN product_type pt ON pt.id = p.type_id WHERE p.name LIKE "%${searchQuery}%"`
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send(sqlres);
        });
});


module.exports = router;