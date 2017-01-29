// here is where mongoose gets the models wired up
var Q = require('q');
var mongoose = require('mongoose');
var models = require('../domainModels');
var initialSeed = require('../domainModels/seedDb/initialSeed');


module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('ninjaAPI db opened');
    });

    if (process.env.NODE_ENV !== "production") {
        initialSeed();
    }

};










