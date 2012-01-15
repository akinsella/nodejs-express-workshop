

var ArticleProvider = require('../modules/articleprovider-mongodb').ArticleProvider;
//var articleProvider = new ArticleProvider();

var articleProvider = new ArticleProvider('localhost', 27017);


exports.index = function (req, res, next) {

    articleProvider.findAll(function (error, docs) {
        res.redirect('/articles');
    });
};

exports.articles = function (req, res, next) {

    articleProvider.findAll(function (error, docs) {
        res.render("index", {
            title:'Blog',
            articles: docs
        });
    });

};

exports.blog_new_get = function(req, res) {
    res.render('blog-new', { locals: {
        title: 'New Blog'
    }
    });
};

exports.blog_new_post = function(req, res) {
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function( error, docs) {
        res.redirect('/')
    });
};

exports.blog_post_get_by_id = function(req, res) {
    articleProvider.findById(req.params.id, function(error, article) {
        res.render('blog_show.jade',
        { locals: {
            title: article.title,
            article:article
        }
        });
    });
};

exports.blog_post_add_comment =  function(req, res) {
    articleProvider.addCommentToArticle(req.param('_id'), {
        person: req.param('person'),
        comment: req.param('comment'),
        created_at: new Date()
       } , function( error, docs) {
           res.redirect('/blog/' + req.param('_id'))
       });
};

//require("./articles.js");