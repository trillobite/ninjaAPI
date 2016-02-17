var Customer = require('mongoose').model('Customer');
var Q = require('q');

module.exports = createDefaultCustomers;

function createDefaultCustomers(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    Customer.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            
            var customer2 = {
                meta:{company: companyId},
                firstName: "John",
                lastName: "Kennedy",
                addresses: [{
                    addressType: "work",
                    primary: true,   
                    address1: "1600 Pennsylvania Ave. NW",   
                    address2: "",   
                    city: "Washington",
                    state: "DC",
                    zip: "20500"}],
                emails: [{
                    emailType: "work",
                    primary: true,
                    email: "president@whitehouse.gov"}],
                phoneNumbers: [{contactType: "work",
                    primary: true,
                    number: "2024561111"}],
                notes: "this is a note"
            };

            var customer1 = {
                meta:{company: companyId},
                firstName: "Ronald",
                lastName: "Reagan",
                addresses: [{
                    addressType: "work",
                    primary: true,   
                    address1: "1600 Pennsylvania Ave. NW",   
                    address2: "",   
                    city: "Washington",
                    state: "DC",
                    zip: "20500"}],
                emails: [{
                    emailType: "work",
                    primary: true,
                    email: "president@whitehouse.gov"}],
                phoneNumbers: [{contactType: "work",
                    primary: true,
                    number: "2024561111"}],
                notes: "this is a note"
            };
            
            Customer.create(customer1, customer2, function (err, item1, item2) {
                if (err) {
                    dfd.reject(new Error(err));
                    console.log(err);
                    return;
                }
                items.push(item1);
                items.push(item2);
                console.log('2 succesfully created customers.....');
                dfd.resolve(items);
                
            });
            
            
           
        }
        
    });
    
    return dfd.promise;
    
}