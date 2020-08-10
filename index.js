const express = require('express');
const mongoose = require("mongoose");
const {MONGOURL} = require('./keys');

const app = express();
const PORT = 5000;

mongoose.connect(MONGOURL,  { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log("connected to mongo");
});

mongoose.connection.on('error', (err) => {
    console.log("error", err);
});

const customMiddleware = (req, res, next) => {
    console.log("middleware executed!");
    next(); //다음 미들웨어 수행을 위해 사용
}

//app.use(customMiddleware);

app.get('/', (req, res) => {
    console.log("hello world");
    res.send("hello world");
})

app.get('/about', customMiddleware, (req, res) => {
    console.log("about");
    res.send("about");
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});