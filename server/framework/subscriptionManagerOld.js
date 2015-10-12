var Company = require('mongoose').model('Company');
var q = require('q');


var State = {};


var SubscriptionManager = function(companyId){
    
    var self = this;
    var deferred = q.defer();
    
    
    Company.findById({_id: companyId}).exec(function(err, company){
        
        self.company = company;
        self.companyState = company.accountState;
        self.currentState = new State[company.accountState](self);
        deferred.resolve();
    });
    
    self.changeState = function(state){
        self.currentState = state;
    }
    
    return deferred.promise;
};

module.exports = SubscriptionManager;

State.pending = function(manager) {
    this.manager = manager;
    
    this.verifyToken = function(token){
        var deferred = q.defer();
        console.log('made it to verify token');
        Company.findById({_id: manager.company}).exec(function(err, company){
        
            if(err){
                deferred.reject({error: true});
            }
            if (company.pendingVerificationCode == token){
                company.accountState = 'trial';
                console.log('token is correct');
                //manager.changeState(new State.Trial(manager));
                company.save(function(err){
                    if(err){
                        deferred.reject({success: false});
                    }
                    deferred.resolve({success: true});
                });
                
            } else {
                deferred.reject({success: false});
            }
        
        });
        
        
        
        return deferred.promise;
    };
    this.submitPayament = function(payment) {
        console.log('can\'t submit payment until account verified');
    };
    this.cardDeclined = function (declination) {
        console.log('can\'t submit declination until account verified');
    };
    this.createSubscription = function(subscription){
        console.log('cant create subscription until account verified');
    };
    this.cancelSubscription = function(cancellation){
        console.log('cant cancel subscription until account verified');
    };
    // submit verfication token
    // submit credit card
    // submit card decline
    // create subscription
    // submit cancellation
};
State.trial = function(manager) {
    // submit verfication token
    // submit credit card
    // submit card decline
    // create subscription
    // submit cancellation
};
State.current = function(manager) {
    // submit verfication token
    // submit credit card
    // submit card decline
    // create subscription
    // submit cancellation
};
State.delinquent = function(manager) {
    // submit verfication token
    // submit credit card
    // submit card decline
    // create subscription
    // submit cancellation
};
State.lockout = function(manager) {
    // submit verfication token
    // submit credit card
    // submit card decline
    // create subscription
    // submit cancellation
};


