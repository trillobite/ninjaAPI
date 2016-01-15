var RentalItem = require('mongoose').model('RentalItem');
var Q = require('q');

module.exports = createDefaultRentalItems;

function createDefaultRentalItems(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    RentalItem.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            
            var rentalItem1 = {
                meta: {company: companyId},
                name: "Test rental item 1",
                price: 100,
                inHouse: true
            }

            var rentalItem2 = {
                meta: {company: companyId},
                name: "Test rental item 2",
                price: 50,
                inHouse: false,
                contact: {
                    name: "test contact",
                    phone: 1234567890,
                    email: "testemail@test.com"
                }
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