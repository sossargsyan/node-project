const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const userRoute = require('./routes/users');
const connectionString = 'mongodb://dbuser:dbpass12@ds139167.mlab.com:39167/projectdb';
const db = mongojs(connectionString, ['users']);

app.use((req, res, next) => {
    req.db = db;
    // Websites you wish to allow to connect, in this case all websites are allowed with '*'
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Cross-origin resource sharing middleware
app.use(cors());

app.use('/api/', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
