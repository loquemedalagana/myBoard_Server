const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) => {
    res.send("express is running");
});

router.post('/signup', (req, res) => {
    const {name, email, password} = req.body;
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
            const user = new User({ //new user
                name,
                email,
                password
            });

            user.save()
            .then(user => {
                res.json({message : "saved successfully"});
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
    .catch(err => { //error
        console.log(err);
    }) 
    .finally(); //끝나고 무조건 실행
});

module.exports = router;