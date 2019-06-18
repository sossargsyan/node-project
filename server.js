const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const userRoute = require('./routes/users');
const connectionString = 'mongodb://sossargsyan:313515Oazis@ds139167.mlab.com:39167/projectdb';
const db = mongojs(connectionString, ['users']);

app.use((req, res, next) => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
    req.db = db;
    next();
});

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Cross-origin resource sharing middleware
app.use(cors());

app.use('/api/', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
