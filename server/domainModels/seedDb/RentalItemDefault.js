var RentalItem = require('mongoose').model('RentalItem');

function createDefaultRentalItems(companyId) {
    
    var items = [];
    RentalItem.find({}).exec(function (err, collection) {
        if(err){
            console.log(err.toString());
        }
        else if (collection.length === 0) {
            
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
                    console.log('RentalItem default data failed: ' + err.toString()); 
                }
                else{
                    items.push(item1);
                    items.push(item2);
                    console.log('2 succesfully created rental items.....');
                }
                
            });
            
            
           
        }
        
    });
    
}

module.exports = createDefaultRentalItems;