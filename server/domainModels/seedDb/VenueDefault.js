var Venue = require('mongoose').model('Venue');
var Q = require('q');

module.exports = createDefaultVenues;

function createDefaultVenues(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    Venue.find({}).exec(function (err, collection) {
        if(err){
            console.log(err.toString());
        }
        
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
   			    name: 'north dining',
			    description: 'northern dining room',
			    capacity: 40,
			    price: 3000,
			    notes: "Test notes 2"
            }
            
            Venue.create(venue1, venue2, function (err, item1, item2) {
                if (err) {
                    console.log('Venue default data failed ' + err.toString());
                }
                else{
                    items.push(item1);
                    items.push(item2);
                    console.log('2 succesfully created venues.....');
                }
            });   
        }
        
    });
    
    return dfd.promise;
    
}