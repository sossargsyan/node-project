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

router.get('/user/:id', (req, res) => {
    req.db.users.find({_id: mongojs.ObjectId(req.params["id"])}, function (error, user) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(user[0]);
        }
    })
});

router.put('/update-user/:id', (req, res) => {
    req.db.users.update(        
        {_id: mongojs.ObjectId(req.params["id"])},
        {$set: {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
        }},
        (err, result) => {            
            if (err) {
                err.errorMessage = 'unable to update user';
                res.status(500).send(err);
            }
            else {
                result.successMessage = 'user updated';
                result.user = req.body;
                res.json(result);
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
