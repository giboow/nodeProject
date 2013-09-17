
/**
 * Module dependencies.
 */

var config = require('./configs/config.js'),
    module = require('./configs/module.js'),
    express = require('express')
    http = require('http');

var app = express();

global.app = app;
global.config = config;

require('./configs/environment.js')(app, express);
require('./configs/routes.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
