var Q = require('q');
var encrypt = require('../../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = createDefaultUsers;

function createDefaultUsers(companyId) {
    
    function encryptPassword(user) {
        var salt, hash;
        salt = encrypt.createSalt();
        hash = encrypt.hashPwd(salt, user.firstName.toLowerCase());
        user.hashed_pwd = hash;
        user.salt = salt;
        return user;
    }
    
    var deferred = Q.defer();
    
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var user1 = encryptPassword({meta:{company: companyId},company: companyId, firstName: "nolan123", lastName: "james", username: "nolan@nolan.com", roles: ['bronze'] });
            var user2 = encryptPassword({meta:{company: companyId}, company: companyId, firstName: "chris123", lastName: "baily", username: "chris@chris.com", roles: ['admin', 'superUser'] });
            var user3 = encryptPassword({meta:{company: companyId},company: companyId, firstName: "kim12345", lastName: "rose", username: "kim@kim.com", roles: ['admin']});
            var user4 = encryptPassword({meta:{company: companyId}, company: companyId, firstName: "alex1234", lastName: "phillips", username: "alex@alex.com", roles: ['silver'] });
            var user5 = encryptPassword({meta:{company: companyId},company: companyId, firstName: "hayley12", lastName: "briana", username: "hayley@hayley.com", roles: ['gold'] });
            
            
            User.create(user1, user2, user3, user4, user5, function (err, user1, user2, user3, user4, user5){
                if (err) {
                    console.log(err);
                    deferred.reject(new Error(err));
                }
                
                console.log('20 succesfully created user documents.....');
                deferred.resolve();
                
            });
            

        }

    });
    return deferred.promise;

}