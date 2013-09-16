module.exports = function(app, express){
    var path = require('path');
    var consolidate = require('consolidate');


    //all
    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');

        app.engine('html', consolidate.swig);
        app.set('view engine', 'html');
        app.set('views', __dirname + '/views');
        app.engine('.html', consolidate.swig);

        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
    });

    //dev
    app.configure('development', function(){
      app.use(express.errorHandler());
    });
};



/* Tell swig where to look for templates when one extends another. */