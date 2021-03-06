require('dotenv').config();
const express = require('express');
const router = express.Router();
const connection = require('./../connection');
const mysqlTool = require('./../mysqlTool');



router.get('', (req, res) => {
    connection.query('SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.location, p.notes  FROM products p LEFT JOIN product_type pt ON pt.id = p.type_id'
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send(sqlres);
        });
});

router.post('', async (req, res) => {
    const data = req.body.data;
    const name = data.name;
    const type = data.type;
    const quantity = data.quantity;
    const location = data.location;
    const price = data.price;
    const notes = data.notes;
    let typeId = null;

    //if product has type get type id before adding to products table
    if (type) {
        await mysqlTool.getTypeId(type)
            .then(response => {
                typeId = response
            });
    }
    connection.query(`INSERT INTO products (name, type_id, quantity, location, price, notes) VALUES ('${name}', ${typeId}, ${quantity || 0}, '${location || 'N/A'}', ${price || 0.00}, '${notes}')`
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send();
        });
});

router.put('', async (req, res) => {
    const data = req.body.data;
    const idToUpdate = data.id;
    const updates = data.toChange;
    let typeId;
    for (const update in updates) {
        //if data is 'type' get type id from product_type table
        if (update === 'type') {
            await mysqlTool.getTypeId(updates[update])
                .then(response => {
                    typeId = response
                });
            connection.query(`UPDATE products SET ${update}_id=${typeId} WHERE id=${idToUpdate}`
                , (err, sqlres) => {
                    if (err) throw err;
                });
            //else update data by value in products table
        } else {
            connection.query(`UPDATE products SET ${update}='${updates[update]}' WHERE id=${idToUpdate}`);
        }
    }
    res.status(200).send();
});

router.delete('', (req, res) => {
    const idToDelete = req.query.id;
    connection.query(`DELETE FROM products WHERE id=${idToDelete}`);
    res.status(200).send();
});



//orderBy & search Routes

router.get('/orderBy', (req, res) => {
    const orderQuery = req.query.orderBy;
    const searchQuery = req.query.searchQuery;
    const searchOrder = req.query.searchOrder;
    //if there is a search query get products LIKE query
    if (searchQuery) {
        connection.query(`SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.location, p.notes  FROM products p LEFT JOIN product_type pt ON pt.id = p.type_id WHERE name LIKE "%${searchQuery}%" ORDER BY ${orderQuery} ${searchOrder}`
            , (err, sqlres) => {
                if (err) throw err;
                res.status(200).send(sqlres);
            });
    } else {
        //order all products by order query
        connection.query(`SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.location, p.notes  FROM products p LEFT JOIN product_type pt ON pt.id = p.type_id ORDER BY ${orderQuery} ${searchOrder}`
            , (err, sqlres) => {
                if (err) throw err;
                res.status(200).send(sqlres);
            });
    }
});

router.get('/search', (req, res) => {
    const searchQuery = req.query.searchQuery;
    connection.query(`SELECT p.id, pt.type AS "type", p.name, p.quantity, p.price, p.location, p.notes  FROM products p LEFT JOIN product_type pt ON pt.id = p.type_id WHERE p.name LIKE "%${searchQuery}%"`
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send(sqlres);
        });
});


//checkIn & checkOut routes
router.put('/checkIn', (req, res) => {
    const data = req.body.data;
    const id = data.id;
    const checkInValue = data.checkInAmount;
    connection.query(`UPDATE products SET quantity = quantity + ${checkInValue} WHERE id=${id}`
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send();
        }
    );
});

router.put('/checkOut', (req, res) => {
    const data = req.body.data;
    const id = data.id;
    const checkOutValue = data.checkOutAmount;
    connection.query(`UPDATE products SET quantity = quantity - ${checkOutValue} WHERE id=${id}`
        , (err, sqlres) => {
            if (err) throw err;
            res.status(200).send();
        }
    );
});


module.exports = router;