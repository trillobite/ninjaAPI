// var seedDb = require('../domainModels/seedDb');

// module.exports = function(seedCompanyId) {

//     seedDb.createDefaultLookups(seedCompanyId);
//     seedDb.createDefaultUsers(companyId).then(                
//         seedDb.createDefaultMenuItems(seedCompanyId)
//         .then(function(items){
//             seedDb.createDefaultMenu(seedCompanyId, items).then(function(menu){
//                 seedDb.createDefaultMenuGroup(seedCompanyId, menu);
//             })
//         })
//     )  
//     seedDb.createDefaultCustomers(companyId);   
//     seedDb.createDefaultContracts(companyId);   
//     seedDb.createDefaultVenues(companyId);   
//     seedDb.createDefaultRentalItems(companyId);
// }