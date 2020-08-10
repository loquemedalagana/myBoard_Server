const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');

//middleware to verify token
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    //authorization === Bearer ddfeerrssw
    if(!authorization){
        return res.status(401).json({error: "you must be logged in"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({error: "you must be logged in"});
        }
        const {_id} = payload
    });
}