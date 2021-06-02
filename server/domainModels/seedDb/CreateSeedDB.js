var seedDb = require('./index');



var createSeedDb = function(CompanyId) {

    seedDb.createDefaultLookups(CompanyId);
    seedDb.createDefaultUsers(CompanyId)
        .then(seedDb.createDefaultMenuItems(CompanyId)
            .then(function(items){
                seedDb.createDefaultMenu(CompanyId, items).then(function(menu){
                    seedDb.createDefaultMenuGroup(CompanyId, menu);
                })
            })
        )  
    seedDb.createDefaultCustomers(CompanyId)
        .then(function(customers){
            seedDb.createDefaultContracts(CompanyId, customers);
        });   
       
    seedDb.createDefaultVenues(CompanyId);   
    seedDb.createDefaultRentalItems(CompanyId);
};

module.exports = createSeedDb;