var Blog = require('../models/Blog');
var path = require('path');
var fs = require('fs');
var join = path.join;

function date_str(sec){
    var blog_date = new Date(sec); 
    var blog_year = blog_date.getFullYear();
    var blog_mon = blog_date.getMonth() + 1;
    var blog_day = blog_date.getDay();
    var blog_hr = blog_date.getHours(); 
    var blog_min = blog_date.getMinutes();
    var date_str = blog_year + "年" + blog_mon + "月" + blog_day + "日 " + blog_hr + ":" + blog_min; 
    return date_str;
}

exports.list = function(req, res, next){
    Blog.find({}, function(err, blogs){
        if (err) return next(err);
        res.render('blogs', {
            title: 'Blogs',
            blogs: blogs
        });
    });
};

exports.new_form = function(req, res){
    res.render('blogs/form', {
        title: '新規投稿'
    });
};

exports.submit = function() {
    return function(req,res,next){
        var title = req.body.title;
        var article = req.body.article;
        Blog.create({
            title: title,
            article: article
        }, function(err){
            if (err) return next(err);
            res.redirect('/');
        });
    };
};

exports.update_form = function(req, res){
    console.log("article id = " + req.param('id'));
    Blog.find({
        _id: req.param('id')
    },function(err,blogs){
        if (err) return next(err);
        res.render('blogs/update_form', {
            title: '更新',
            id: blogs[0]._id,
            blog_title: blogs[0].title,
            article: blogs[0].article,
            date: date_str(blogs[0].date)
        });
    });
};

exports.update_submit = function() {
    return function(req,res,next){
        var id = req.body.id;
        var title = req.body.title;
        var article = req.body.article;
        // console.log("Update ID = " + id);
        Blog.update({_id: id},
                    {title: title,article: article,date: Date.now()},
                    {},
                    function(err){
                        if (err){
                            console.log("Error: " + err);
                        }
                    }
                   );
        res.redirect("/");
    };
};

exports.del_article = function(){
    return function(req,res,next){
        var id = req.body.article_id;
        console.log("article id = " + id);
        Blog.remove({_id: id},function(err){
            if (err){
                console.log("Delete Error: " + err);
            }
            res.redirect("/");
        });
    };
}