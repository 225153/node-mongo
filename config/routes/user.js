const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {
    let data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);
    let user = new User(data);
    user.save()
        .then((user) => 
            user.password ='****',
            res.status(201).send(user))
        .catch(err => res.status(400).send('Error registering user: ' + err.message));
});

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email: email })
        .then(
            (user) => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        let payload = { id: user._id, username: user.username, email: user.email };
                        let token = jwt.sign(payload, '123456789', { expiresIn: '1h' });

                        res.status(200).send(token);
                    } else {
                        res.status(401).send('Invalid password');
                    }
                } else {
                    res.status(404).send('User not found');
                }
            }
        )

        .catch(err => res.status(500).send('Error logging in: ' + err.message));
    

        
});
    




module.exports = router;
// Export the router

