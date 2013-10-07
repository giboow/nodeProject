module.exports = function(app) {
    app.get('/', function(req, res, next){
        index(req, res, next, app);
    });
}

function index (req, res, next, app){
     var user = require('../models/user');
     var users = null;
     user.getRecent(app, function(err, rows, field) {
         users = rows;
         console.log(users);
         res.render(
             'index',
             {
                 title: 'Express',
                 foo: {
                     bar: "test"
                 },
                 'users' : users
             }
         );
     });
};