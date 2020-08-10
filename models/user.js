//mvc 패턴 공부
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //나중에 필드 추가하기
    score: {
        type: Number
    }
});

module.exports = new mongoose.model("User", userSchema);

//admin일 경우 따로 필드 추가해서 작성