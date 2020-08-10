const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/requireLogin');

router.get('/', (req, res) => {
    res.send("express is running");
});

router.get('/protected', requireLogin, (req, res) => {
    res.send("hello user!");
});

router.post('/signup', (req, res) => {
    const {name, email, password, score, date} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({error: "please add all the fields except your SNS links"});
    }
    //else res.json({message: "sucessfully posted"}); 나중에 프론트에 넘길 때 제이슨 이용
    User.findOne({email : email}) //promise (producer)
    .then( (savedUser) => {//success (consumer) 중복된 회원이 있을 때
        if(savedUser){
            return res.status(422).json({error: "이미 가입된 이메일입니다."});
        }
        else{
            bcrypt.hash(password, 12)
            .then( hashedpassword => {
                const user = new User({ //new user
                    name,
                    email,
                    password: hashedpassword,
                    score,
                    date
                });
                //user.score+=10;
                //user.score+=5;
                user.save()
                .then(user => {
                    res.json({message : "saved successfully"});
                })
                .catch(err => {
                    console.log(err);
                })
            })
        }
    })
    .catch(err => { //error
        console.log(err);
    }) 
    .finally(); //끝나고 무조건 실행
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(422).json({error: "please add email or password"}); //client side error
    }
    User.findOne({email:email})
    .then (savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "Invalid Email or password"});
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                res.json({message : `sucessfully signed in and your score is ${savedUser.score}.`});
                //const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
                //res.json({token});
            }
            else{
                return res.status(422).json({error: "Invalid Email or password"});
            }
        })
        .catch(err => {
            console.log(err); //server side error
        })
    })
});

router.post('/logout', (req, res) => {

});

module.exports = router;