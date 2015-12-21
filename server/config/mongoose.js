// here is where mongoose gets the models wired up
var Q = require('q');
var mongoose = require('mongoose');
var models = require('../domainModels');
var seedDb = require('../domainModels/seedDb');


// var userModel = require('../models/User');
// var contractModel = require('../models/Contract');
// var companyModel = require('../models/Company');
// var customerModel = require('../models/Customer');
// var bidModel = require('../models/Bid');
// var navigationModel = require('../models/Navigation');
// var menuGroupModel = require('../models/MenuGroup');
// var menuItemModel = require('../models/MenuItem');
// var menuModel = require('../models/Menu');
// var lookupsModel = require('../models/Lookups');

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
            
                
        });
    
    // companyModel.createDefaultCompany()
    // .then(function (companyId) {
    //     seedCompanyId = companyId;
    //     userModel.createDefaultUsers(companyId)
    //             .then(menuItemModel.createDefaultMenuItems(seedCompanyId)
    //             .then(function (items) {
    //                 menuModel.createDefaultMenu(seedCompanyId, items).then(function(menu) {
    //                 menuGroupModel.createDefaultMenuGroup(seedCompanyId, menu);
    //                 });
    //             })
                
    //             .then(contractModel.createDefaultContracts(seedCompanyId))
    //             .then(customerModel.createDefaultCustomers(seedCompanyId))
    //             .then(navigationModel.createDefaultNavigation())
    //             .then(lookupsModel.createDefaultLookups(seedCompanyId))
    //             );
    // });

};
   
    
    
    
    
    




