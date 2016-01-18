var Customer = require('mongoose').model('Customer');
var Q = require('q');

module.exports = createDefaultCustomers;

function createDefaultCustomers(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    Customer.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            
            var customer1 = {
                meta:{company: companyId},
                firstName: "Test Customer 1 fname",
                lastName: "Test Customer 1 lname",
                address: [{
                    addressType: "Test address type",
                    primary: true,   
                    address1: "test address line 1",   
                    address2: "test address line 2",   
                    city: "Test city 1",
                    State: "Test State",
                    Zip: 123456}],
                emails: [{
                    emailType: "test Email type",
                    primary: true,
                    email: "testemail123@test.com"}],
                phoneNumbers: [{contactType: "Test contact type",
                    primary: true,
                    number: 1234567890}] 
            }

            var customer2 = {
                meta:{company: companyId},
                firstName: "Test Customer 2 fname",
                lastName: "Test Customer 2 lname",
                address: [{
                    addressType: "Test address type",
                    primary: true,   
                    address1: "test address line 1",   
                    address2: "test address line 2",   
                    city: "Test city 1",
                    State: "Test State",
                    Zip: 123456}],
                emails: [{
                    emailType: "test Email type",
                    primary: true,
                    email: "testemail123@test.com"}],
                phoneNumbers: [{
                    contactType: "Test contact type",
                    primary: true,
                    number: 1234567890}]
            }
            
            Customer.create(customer1, customer2, function (err, item1, item2) {
                if (err) {
                    dfd.reject(new Error(err));
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