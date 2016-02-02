var RentalItem = require('mongoose').model('RentalItem');
var Q = require('q');



function createDefaultRentalItems(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    RentalItem.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            
            var rentalItem1 = {
                meta: {company: companyId},
                name: "Test rental item 1",
                description: 'test description',
                price: 100,
                inHouse: true
            }

            var rentalItem2 = {
                meta: {company: companyId},
                name: "Test rental item 2",
                description: 'test description',
                price: 50,
                inHouse: false
            }

            RentalItem.create(rentalItem1, rentalItem2, function (err, item1, item2) {
                if (err) {
                    dfd.reject(new Error(err));
                }
                items.push(item1);
                items.push(item2);
                console.log('2 succesfully created rental items.....');
                dfd.resolve(items);
                
            });
            
            
           
        }
        
    });
    
    return dfd.promise;
    
}

module.exports = createDefaultRentalItems;