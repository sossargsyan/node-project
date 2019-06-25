const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

// Get all users
router.get('/users/', (req, res) => {
    req.db.users.find((error, users) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(users);
        }
    });
});

router.post('/user/', (req, res) => {
    db.users.save( req.body, (req, res) => {
        if (error) {
            error.errorMessage = "unable to add user";
            res.status(500).send(error);
        } else {
            res.successMessage = "user added";
            res.json(users);
        }
    });
});

module.exports = router;
