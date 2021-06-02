var q = require('q');
var cm = require('./companyManager');
var pm = require('./paymentManager');

var subscriptionManager = {
    state: undefined,
    company: undefined,
    states: {
        createNewAccount: {
            initialize: function(context) {
                this.context = context;
            },
            createNewAccount: function(signUpInfo) {
                var deferred = q.defer();
                cm.createNewCompany(signUpInfo).then(
                    function(company){
                        deferred.resolve(company);
                    },
                    function(err){
                        deferred.reject({message: "the company manager failed to create a company"});
                    }
                );
                
                return deferred.promise;
                
                // use company manager to create a new account
                // if successful resolve promise with the company
                // if fail reject promise with error message
            }
        },
        pending: {
            initialize: function(context) {
                this.context = context;
            },
            verifyCode: function(code) {
                    
                    var deferred = q.defer();
                    var self = this;
                    var Company = this.context.company;
                    if (Company.pendingVerificationCode == code){
                        Company.accountState = 'awaitingFirstPayment';
                        Company.save(function(err){
                            if(err){
                                deferred.reject('Something went wrong with the save method');
                            } else {
                                self.context.changeState(self.context.states.awaitingFirstPayment);
                                deferred.resolve('Account has moved to awaiting first payament state.');
                            }
                        });
                    } else {
                        deferred.reject('Account is not verified...');
                    }
                    return deferred.promise;
            },
            runFirstPayment: function(payment) {
                var deferred = q.defer();
                deferred.reject('Account is not verified.');
                return deferred.promise;
            }
        },
        awaitingFirstPayment: {
            initialize: function(context){
                this.context = context;
            },
            verifyCode: function(code) {
                    var deferred = q.defer();
                    deferred.reject('The company is already verified.');  
                    return deferred.promise;
            },
            runFirstPayment: function(payment) {
                var deferred = q.defer();
                var self = this;
                var Company = self.context.company;
                pm.processOneTime(payment).then(function(){
                    Company.accountState = 'trial';
                    Company.save(function(err){
                        if(err){
                            deferred.reject('Something went wrong with the save method');
                        } else {
                            self.context.changeState(self.context.states.trial);
                            deferred.resolve('payment succeeded...moving to trial state.');
                        }
                    });
                }, function(){
                    deferred.reject('payment failed...');
                });
                
                return deferred.promise;
            }
        },
        trial: {
            initialize: function(context){
                this.context = context;
            },
            verifyCode: function(code) {
                var deferred = q.defer();
                deferred.reject('The company is already verified.');  
                return deferred.promise;
            },
            runFirstPayment: function(payment) {
                var deferred = q.defer();
                deferred.reject('The company has already made the first payment.');  
                return deferred.promise;
            }
        }
    },
    initialize: function(company){
        var deferred = q.defer();
        // test if the company passed in is a mongoose model
        if (company.constructor.name === 'model') {
            this.company = company;
            // each state is initialized with this for the context
            this.states.pending.initialize(this);
            this.states.trial.initialize(this);
            this.states.awaitingFirstPayment.initialize(this);
            // get the current state
            this.state = this.states[company.accountState];
            deferred.resolve('SubscriptionManager is intialized');
        } else {
            deferred.reject('You can only instantiate the subscription manager with a mongoose Company model');
        }
        return deferred.promise;
    },
    
    // methods delegated to the active state
    createNewAccount: function(signUpInfo) {
        return this.state.createNewAccount(signUpInfo);
    },
    verifyCode: function(code){
        return this.state.verifyCode(code);
    },
    runFirstPayment: function(payment){
        return this.state.runFirstPayment(payment);
    },
    // change state method
    changeState: function(state) {
        if(this.state !== state) {
            this.state = state;
        }
    }
};

module.exports = subscriptionManager;