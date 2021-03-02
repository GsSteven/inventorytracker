require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const inventory = require('./routes/inventory');
const types = require('./routes/types');
const connection = require('./connection');

const PORT = process.env.PORT || 8080;

connection.connect((err) => {
    if (err) throw err;

    console.log('Connected to mySQL DB');
});

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/api/inventory', inventory);
app.use('/api/types', types);

//for production app
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});




