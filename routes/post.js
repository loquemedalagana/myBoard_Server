const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = mongoose.model('Post');

const requireLogin = require('../middleware/requireLogin'); //나중에 관리자 페이지 따로 미들웨어 생성

router.get('/allpost', requireLogin, (req, res) => { //로그인한 사용자만 보기가능
    Post.find()
    .then(posts => {
        res.json({posts});
    })
    .catch(err => {
        console.log(err);
    })
})

router.post('/createpost', requireLogin, (req, res) => {
    const {title, content} = req.body;
    if(!title || !content) {
        return res.status(422).json({error: "please add all the fields"}); //client side error
    }
    req.user.password = undefined; //보안을 위해!
    console.log(req.user);
    //res.send("okis");
    const post = new Post ({
        title,
        content,
        author: req.user
    });
    post.save().then(result => {
        res.json({post: result});
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;