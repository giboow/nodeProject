module.exports = function(app) {
    app.get('/', function(req, res, next){
        index(req, res, next, app);
    });
}

function index (req, res, next, app){
     var user = require('../models/user');
     user.getRecent(app, function(res, rows, field) {
         console.log(field);
     });

     res.render(
         'index',
         {
             title: 'Express',
             foo: {
                 bar: "test"
             }
         }
     );
};