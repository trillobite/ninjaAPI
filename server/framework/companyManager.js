var Company = require('mongoose').model('Company');
var User = require('mongoose').model('Company');
var q = require('q');

exports.createNewCompany = function (signUpInfo) {
    var deferred = q.defer();
    var companyData = dtoCompanyHelper(signUpInfo);
    console.log(companyData);
    var newCompany = new Company(companyData);
    newCompany.save(function(err){
        if(err){
            console.log(err);
            deferred.reject(err);
        }
        deferred.resolve(newCompany);
        //success
        // var newUser = dtoUserHelper(signUpInfo);
        // newUser.company = newCompany._id;
        // createNewUser(newUser).then(function(user){
        //     deferred.resolve(newCompany);
        // }, function(err){
        //     deferred.reject(err);
        // });
        
    });
    return deferred.promise;
};

exports.createNewUser = createNewUser;

function createNewUser (newUser) {
    var deferred = q.defer();
    User.create(newUser, function(err, user){
        if (err){
            console.log(err);
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
        }]
    };
    return companyData;
}

function dtoUserHelper (signUpInfo) {
    var userData = {
        firstName: signUpInfo.firstName,
        lastName: signUpInfo.lastName,
        username: signUpInfo.email
    };
    return userData
}





