var Lookups = require('mongoose').model('Lookups');
var Q = require('q');



function createDefaultLookups(companyId) {
    
    var dfd = Q.defer();
    
    Lookups.find({}).exec(function (err, collection) {
        if (err) {
            dfd.reject(err);
        }
        if (collection.length === 0) {
            var lookup = {
                meta: {company: companyId},
                menuItemTags: ['Appetizer', 'Soup', 'Salad', 'Entree', 'Dessert'],
                contactTags: ['Home','Cell','Work'],
                commTypes: ['email', 'phone', 'mail', 'in-person', 'other'],
                roles:['superUser', 'admin', 'gold', 'silver', 'bronze']
            };
            Lookups.create(lookup, function (err, item1) {
                if (err) {
                    dfd.reject(new Error(err));
                }
                console.log('60 successfully created lookup document.....');
                dfd.resolve();
            });
        }
    }

        );

    return dfd.promise;
}

module.exports = createDefaultLookups;