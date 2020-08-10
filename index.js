const express = require('express');
const app = express();

const PORT = 5000;

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