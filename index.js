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

//after the connection

//data models
require('./models/user');
require('./models/post');

app.use(express.json()); //순서 중요 이름 출력될라면
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});