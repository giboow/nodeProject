
/**
 * Module dependencies.
 */

var config = require('./config.js'),
    express = require('express')
    http = require('http');

var app = express();

global.app = app;
global.config = config;

require('./environment.js')(app, express);
require('./routes.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
