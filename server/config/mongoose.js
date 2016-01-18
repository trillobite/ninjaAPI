// here is where mongoose gets the models wired up
var Q = require('q');
var mongoose = require('mongoose');
var models = require('../domainModels');
var seedDb = require('../domainModels/seedDb');

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('ninjaAPI db opened');
    });

    //create the mock data here.
    var seedCompanyId;
    
    seedDb.createDefaultCompany()
        .then(function(companyId) {
            seedCompanyId = companyId;
            seedDb.createDefaultLookups(seedCompanyId);
            seedDb.createDefaultUsers(companyId).then(                
                seedDb.createDefaultMenuItems(seedCompanyId)
                .then(function(items){
                    seedDb.createDefaultMenu(seedCompanyId, items).then(function(menu){
                        seedDb.createDefaultMenuGroup(seedCompanyId, menu);
                    })
                })
            )  
            seedDb.createDefaultCustomers(companyId);   
            seedDb.createDefaultContracts(companyId);   
            seedDb.createDefaultVenues(companyId);   
            seedDb.createDefaultRentalItems(companyId);   
        });
};
   
    
    
    
    
    




