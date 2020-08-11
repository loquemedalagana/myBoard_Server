const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model('User'); //admin일 경우 따로 처리

//middleware to verify token
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    //authorization === Bearer ddfeerrssw
    if(!authorization){
        return res.status(401).json({error: "you must be logged in"}); //unauthorized error
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({error: "you must be logged in"});
        }
        const {_id} = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            if(req.user.isadmin === false){
                 return res.status(401).json({error: "you must be admin"});
            }
            console.log(req.user);
            next(); //next호출 위치가 왜 여기로 가야하나? 기억해두기
        });
    });
}