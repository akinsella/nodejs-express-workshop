/**
 * Created by JetBrains WebStorm.
 * User: akinsella
 * Date: 13/01/12
 * Time: 23:12
 * To change this template use File | Settings | File Templates.
 */

var express = require('express'),
    hogan = require('hogan.js'),
    stylus = require('stylus'),
//    jqtpl = require("jqtpl"),
    adapter = require('./modules/hogan-express-app.js'),
    routes = require('./routes');

var app = module.exports = express.createServer();

app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret:"my-secret"}));
    app.use(express.logger());
    app.use(express.methodOverride());
    app.use(stylus.middleware({ src:__dirname + '/public' }));

    app.use(app.router);

    app.set('view engine', 'html');
    app.set('view options', {layout:false});
    app.set('views', __dirname + '/views');
    app.register('html', adapter.init(hogan));
//    app.register("html", jqtpl.express);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

app.get("/", routes.index);
app.get("/articles", routes.articles);

app.get('/blog/new', routes.blog_new_get);
app.post('/blog/new', routes.blog_new_post);
app.get('/blog/:id', routes.blog_post_get_by_id);
app.post('/blog/addComment', routes.blog_post_add_comment);


app.listen(8080);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);