var Venue = require('mongoose').model('Venue');
var Q = require('q');

module.exports = createDefaultVenues;

function createDefaultVenues(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    Venue.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            
            var venue1 = {
                meta:{company: companyId},
			    name: 'south dining room',
			    description: 'southern dining room',
			    capacity: 18,
			    price: 1000,
			    notes: "Test notes 1"
            }

            var venue2 = {
                meta:{company: companyId},
   			    name: 'south dining room',
			    description: 'southern dining room',
			    capacity: 18,
			    price: 1000,
			    notes: "Test notes 1"
            }
            
            Venue.create(venue1, venue2, function (err, item1, item2) {
                if (err) {
                    dfd.reject(new Error(err));
                }
                items.push(item1);
                items.push(item2);
                console.log('2 succesfully created venues.....');
                dfd.resolve(items);
                
            });
            
            
           
        }
        
    });
    
    return dfd.promise;
    
}