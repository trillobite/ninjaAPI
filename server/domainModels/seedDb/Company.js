var Company = require('mongoose').model('Company');
var Q = require('q');


module.exports = createDefaultCompany;

function createDefaultCompany() {
    var deferred = Q.defer();
    
    Company.find({}).exec(function (err, collection) {
        if (collection.length === 0) {

            var company1 = {
                companyName: "Old Town Dining, LLC",
                addresses: [{
                    addressType: "headquarters",
                    primary: true,
                    address1: "28699 Old Town Front Street",
                    city: "Temecula",
                    state: "CA",
                    zip: "92592"
                }],
                emails: [{
                    emailType: "accountAdmin",
                    primary: true,
                    email: "chris@oldtowndining.com"
                }],
                contactNumbers: [{ primary: true, contactType: "admin", number: "9516769567" }],
                duesCurrent: true,
                accountLockout: false,
                accountState: 'awaitingFirstPayment'
            };
            
            Company.create(company1, function (err, company) {
                if (err) {
                    console.log('i have an error');
                    console.log(err);
                    deferred.reject(new Error(err));
                } else {
                    
                    console.log('10 successfully created company document....');
                    deferred.resolve(company._id);
                    
                }
            });
            
            
        }

    });
    
    return deferred.promise;
}