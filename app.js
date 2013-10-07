var config = require('./configs/config.js');
global.config = config;


var express = require('express')
    http = require('http');

var app = express();
app.set('config', config);



module = require('./configs/module.js')(app);

require('./configs/environment.js')(app, express);
require('./configs/routes.js')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

