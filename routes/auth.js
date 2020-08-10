const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("express is running");
});

router.post('/signup', (req, res) => {
    console.log(req.body); //express 4.16+ 에는 body가 내장
});

module.exports = router;