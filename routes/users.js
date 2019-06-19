const express = require('express');
const router = express.Router();

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

module.exports = router;
