/**
 * Init modules
 */
module.exports = function(app) {
    initGraphite(app);
    initMysqlDb(app);
    initCache(app);
};

/**
 * Init MysqlDb
 * If MySQL's config is detected, MySQL's client is stored in app
 * @param app Application
 */
function initMysqlDb(app)
{
    //Mysql
    var dbConfig = app.get("config").mysql;
    if(dbConfig) {
        function handleDisconnect(app) {
            var mysql  = require('mysql');
            connection = mysql.createConnection(dbConfig);


            connection.connect(function(err) {
                if(err) {
                    console.log('error when connecting to db:', err);
                    setTimeout(handleDisconnect(app), 2000);
                } else {
                    app.set("db", connection);
                }
            });

            connection.on('error', function(err) {
                console.log('db error', err);
                if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                    handleDisconnect(app);
                } else {
                  throw err;
                }
            });
        }
        handleDisconnect(app);
    }
}

/**
 * Init Graphite
 * If graphite's config is detected, graphite client is stored in app
 * @param app Application
 */
function initGraphite(app)
{
    var configGraphite = app.get('config').graphite;
    if (configGraphite) {
        var graphiteAdapter = require('graphite');
        var graphite = graphiteAdapter.createClient('plaintext://'+configGraphite);
        app.set('graphite', graphite);
    }
}

/**
 * Init cache
 * @param app Application
 */
function initCache(app)
{
    var cache = require('memory-cache');
    app.set('cache', cache);
}


