var MenuItem = require('mongoose').model('MenuItem');
var Q = require('q');

module.exports = createDefaultMenuItems;

function createDefaultMenuItems(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    MenuItem.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            var menuItem1 = {meta:{company: companyId}, name: 'Caesar Salad', description: 'Crisp romaine lettuce tossed with Caesar dressing, croutons and asiago cheese', category: 'Salad' };
            var menuItem2 = {meta:{ company: companyId}, name: 'House Salad', description: 'Mixed greens tossed with raspberry vinaigrette and toasted almonds', category: 'Salad' };
            
            MenuItem.create(menuItem1, menuItem2, function (err, item1, item2) {
                if (err) {
                    dfd.reject(new Error(err));
                }
                items.push(item1);
                items.push(item2);
                console.log('30 succesfully created menuitem documents.....');
                
                dfd.resolve(items);
                
            });
            
            
           
        }
        
    });
    
    return dfd.promise;
    
}

