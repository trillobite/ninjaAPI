// here is where mongoose gets the models wired up
var Q = require('q');
var mongoose = require('mongoose');
//var initialSeed = require('../domainModels/seedDb/initialSeed');
var models = require('../domainModels');

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('ninjaAPI db opened');
    });

    //initialSeed();

};
   
    
    
    
    
    




