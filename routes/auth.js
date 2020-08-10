const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("express is running");
});

router.post('/signup', (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(422).json({error: "please add all the fields except your SNS links"});
    }
    else res.json({message: "sucessfully posted"});
});

module.exports = router;