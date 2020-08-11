const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    author: { //relationship
        type: ObjectId,
        ref: "User"
    },
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: {
        type: String,
        default: "no media"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports =  mongoose.model("Post", postSchema);