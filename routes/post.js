const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/createpost', (req, res) => {
    const {title, body} = req.body;
    if(!email || !password) {
        return res.status(422).json({error: "please add all the fields"}); //client side error
    }
    console.log(req.user);
    res.send("okis");
    // const post = new post ({

    // });
});

module.exports = router;