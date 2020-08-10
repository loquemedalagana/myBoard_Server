const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("express is running");
})

module.exports = router;