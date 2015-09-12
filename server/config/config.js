var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        secret: 'ninjaApiRox',
        rootPath: rootPath,
        db: 'mongodb://localhost/ninjaAPI',
        port: process.env.PORT || 3000
    },
    production: {
        secret: 'ninjaApiRox',
        rootPath: rootPath,
        db: 'mongodb://patterncoder:y5EQJ5m7C3@ds042688.mongolab.com:42688/ninja-api',
        port: process.env.PORT || 80
    }



    // mongodb://patterncoder:y5EQJ5m7C3@ds042688.mongolab.com:42688/ninja-api
    // mongo ds042688.mongolab.com:42688/ninja-api -u patterncoder -p y5EQJ5m7C3
};