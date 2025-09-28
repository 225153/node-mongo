const express = require('express');
const router = express.Router();
const User = require('../../models/user');


router.post('/signup', (req, res) => {
    let data = req.body;
    let user = new User(data);
    user.save()
        .then(() => res.status(201).send('User registered successfully'))
        .catch(err => res.status(400).send('Error registering user: ' + err.message));
});

router.post('/login', (req, res) => {
    let data = req.body;
    User.findOne({ username: data.username, password: data.password })
        .then(user => {
            if (user) {
                res.status(200).send('Login successful');
            } else {
                res.status(401).send('Invalid username or password');
            }
        })
        .catch(err => res.status(400).send('Error logging in: ' + err.message));
});
    




module.exports = router;
// Export the router

