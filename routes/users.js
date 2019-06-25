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

router.put('/update-user/:id', (req, res) => {
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
        }
    );
});

router.delete('/users/:id', (req, res) => {
    req.db.users.remove({_id: mongojs.ObjectId(req.params.id)}, (error, response) => {
        if (error) {
            error.errorMessage = "unable to delete user";
            res.status(500).send(error);
        } else {
            res.successMessage = "user deleted";
            res.json(response);
        }
    });
});

router.post('/user/', (req, res) => {
    req.db.users.save(req.body, (error, user) => {
        if (error) {
            error.errorMessage = "unable to add user";
            res.status(500).send(error);
        } else {
            const response = {
                user: user,
                successMessage: "user added"
            }            
            res.json(response);
        }
    });
});

module.exports = router;
