exports.getRecent = function(app, callback) {
    db = app.get('db');
    cache = app.get('cache');
    var query = "SELECT * FROM user LIMIT 10";
    db.query(query, callback);
};


