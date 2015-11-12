var Company = require('mongoose').model('Company');
var User = require('mongoose').model('User');
var encrypt = require('../utilities/encryption');
var q = require('q');

exports.createNewCompany = createNewCompany;

function createNewCompany (signUpInfo) {
    var deferred = q.defer();
    var companyData = dtoCompanyHelper(signUpInfo);
    
    var newCompany = new Company(companyData);
    newCompany.save(function(err){
        if(err){
            console.log(err);
            deferred.reject(err);
        }
        // a new company needs an admin user and this happens below
        var newUser = dtoUserHelper(signUpInfo);
        newUser.company = newCompany._id;
        
        createAccountAdmin(newUser).then(function(user){
            deferred.resolve(newCompany);
        }, function(err){
            deferred.reject(err);
        });
        
    });
    return deferred.promise;
}



function createAccountAdmin (newUser) {
    var deferred = q.defer();
    newUser.username = newUser.username.toLowerCase();
    newUser.salt = encrypt.createSalt();
    newUser.hashed_pwd = encrypt.hashPwd(newUser.salt, newUser.password);
    User.create(newUser, function(err, user){
        if (err){
            if(err.toString().indexOf('E11000')>-1){
                err = new Error('Duplicate Username');
            }
            deferred.reject(err);
        }
        deferred.resolve(user);
    });
    return deferred.promise;
}

function dtoCompanyHelper (signUpInfo) {
    var companyData = {
        companyName: signUpInfo.companyName,
        addresses: [{
            addressType: 'subscriptionBilling',
            primary: true,
            address1: signUpInfo.address1,
            address2: signUpInfo.address2,
            city: signUpInfo.city,
            state: signUpInfo.state,
            zip: signUpInfo.zip
        }],
        emails: [{
            emailType: 'accountAdmin',
            primary: true,
            email: signUpInfo.email
        }],
        contactNumbers: [{
            primary: true,
            contactType: 'admin',
            contactNumber: signUpInfo.phone
        }],
        duesCurrent: false,
        accountLockout: false,
        accountState: 'awaitingFirstPayment'
    };
    return companyData;
}

function dtoUserHelper (signUpInfo) {
    var userData = {
        firstName: signUpInfo.firstName,
        lastName: signUpInfo.lastName,
        username: signUpInfo.email,
        password: signUpInfo.password
    };
    return userData;
}





