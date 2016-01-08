// var MenuGroup = require('mongoose').model('MenuGroup');

// module.exports = createDefaultVenues;


// function createDefaultVenues(companyId) {
    
//     var newMenuGroup = new MenuGroup({
        
//         meta: {company: companyId},
//         name: 'South Dining Room',
//         description: 'Southern most dining room',
//         capacity: '18',
//         price: '1000',
//         notes: 'May fit more than 18 with different table layouts'
//     });

//     console.log(' successfully created menu groups document....');
//     return newMenuGroup.save();
    
// }



// // var Lookups = require('mongoose').model('Lookups');
// // var Q = require('q');



// // function createDefaultVebyes(companyId) {
    
// //     var dfd = Q.defer();
    
// //     Lookups.find({}).exec(function (err, collection) {
// //         if (err) {
// //             dfd.reject(err);
// //         }
// //         if (collection.length === 0) {
// //             var venue1 = {
// //                 meta: {company: companyId},
// //                 menuItemTags: ['Appetizer', 'Soup', 'Salad', 'Entree', 'Dessert'],
// //                 contactTags: ['Home','Cell','Work']
// //             };
// //             Lookups.create(lookup, function (err, item1) {
// //                 if (err) {
// //                     dfd.reject(new Error(err));
// //                 }
// //                 console.log('60 successfully created lookup document.....');
// //                 dfd.resolve();
// //             });
// //         }
// //     }

// //         );

// //     return dfd.promise;
// // }

// // module.exports = createDefaultLookups;