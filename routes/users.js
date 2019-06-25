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

router.delete('/users/:id', (req, res) => {
    req.db.users.remove( { _id: mongojs.ObjectId(req.params.id) }, (err, resp) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resp);
        }
    });
});

module.exports = router;
