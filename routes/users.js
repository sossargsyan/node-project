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

router.get('/update-user/:id', (req, res) => {
    req.db.users.update(
        {id: mongojs.ObjectId(req.params["id"])},
        {$set: req.body},
        (err, res) => {
            if (err) {
                err.errorMessage = 'unable to update user';
                res.status(500).send(err);
            }
            else {
                res.successMessage = 'user updated';
                res.json(res);
            }
        });
});

module.exports = router;
