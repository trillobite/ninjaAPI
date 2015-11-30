var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        secret: 'ninjaApiRox',
        rootPath: rootPath,
        db: 'mongodb://localhost/ninjaAPI',
        port: process.env.PORT || 3001,
        email_un: 'banquet.ninja@gmail.com',
        email_pw: 'BailyRobertson'
    },
    production: {
        secret: 'ninjaApiRox',
        rootPath: rootPath,
        db: 'mongodb://patterncoder:y5EQJ5m7C3@ds054298.mongolab.com:54298/ninjaapi',
        port: process.env.PORT || 80,
        email_un: 'banquet.ninja@gmail.com',
        email_pw: 'BailyRobertson'
    }



    // mongodb://patterncoder:y5EQJ5m7C3@ds042688.mongolab.com:42688/ninja-api
    // mongo ds042688.mongolab.com:42688/ninja-api -u patterncoder -p y5EQJ5m7C3
};