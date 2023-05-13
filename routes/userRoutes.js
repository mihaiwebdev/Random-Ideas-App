const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/', async(req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        res.status(400).json('Please fill in all the fields');

    } else {
        try {
            const userExists = await User.findOne({email});
    
            if (userExists) {
                res.status(400).json('User already exists');
    
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
    
                const user = new User({
                    email,
                    name,
                    password: hashedPassword,
                });

                const savedUser = await user.save();
                
                const data = {
                    _id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    token: generateToken(user._id)
                }

                res.json({success: true, data});
            }
    
        } catch (error) {
            res.status(500).json('Something went wrong!');
            console.log(error);
        }
    }
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        const comparePw = await bcrypt.compare(password, user.password);

        if (user && comparePw) {
            const data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            };

            res.json({success: true, data});

        } else {
            res.status(401).json('Invalid credentials!');
        }

    } catch (error) {
        res.status(500).json('Something went wrong!');
        console.log(error);
    }
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
};

module.exports = router;
