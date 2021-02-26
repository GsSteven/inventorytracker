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

router.post('', (req, res) => {
    const data = req.body.data;
    const name = data.name;
    const type = data.type;
    const quantity = data.quantity;
    const location = data.location;
    const price = data.price;
    const notes = data.notes;
    let typeId;

    //if product has type get type id before adding to products table
    if (type) {
        connection.query(`SELECT id FROM product_type WHERE type = '${type}'`
            , (err, sqlres) => {
                if (err) throw err;
                typeId = sqlres[0].id;
                connection.query(`INSERT INTO products (name, type_id, quantity, location, price, notes) VALUES ('${name}', ${typeId}, ${quantity}, '${location}', ${price}, '${notes}')`
                    , (err, sqlres) => {
                        if (err) throw err;
                        res.status(200).send();
                    });
            });
    } else {
        connection.query(`INSERT INTO products (name, type_id, quantity, location, price, notes) VALUES ('${name}', ${typeId}, ${quantity}, '${location}', ${price}, '${notes}')`
            , (err, sqlres) => {
                if (err) throw err;
                res.status(200).send();
            });
    }
});





router.get('/orderBy', (req, res) => {
    const orderQuery = req.query.orderBy;
    const searchQuery = req.query.searchQuery;
    //if there is a search query get products LIKE query
    if (searchQuery) {
        connection.query(`SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.location, p.notes  FROM products p JOIN product_type pt ON pt.id = p.type_id WHERE name LIKE "%${searchQuery}%" ORDER BY ${orderQuery}`
            , (err, sqlres) => {
                if (err) throw err;
                res.status(200).send(sqlres);
            });
    } else {
        //order all products by order query
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