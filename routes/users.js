const express = require('express');
const router = express.Router();

// Get all users
router.get('/users/', (req, res) => {
    console.log('Mtav');
    req.db.users.find((error, users) => {
       if (error) {
           console.log('error: ', error);
       } else {
           console.log('users: ', users);
       }
    });
});

module.exports = router;
