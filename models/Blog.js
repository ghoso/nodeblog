var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeblog');

var ObjectId = mongoose.Schema.ObjectId;
var Post = new mongoose.Schema({
    author: ObjectId,
    title: String,
    article: String,
    date: {type: Date,default: Date.now}
    });

module.exports = mongoose.model('Blog', Post);