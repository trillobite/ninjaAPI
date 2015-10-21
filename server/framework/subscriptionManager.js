var q = require('q');

var subscriptionManager = {
    state: undefined,
    company: undefined,
    states: {
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
                // if payment succeeds
                if (true){
                        Company.accountState = 'trial';
                        Company.save(function(err){
                            if(err){
                                deferred.reject('Something went wrong with the save method');
                            } else {
                                self.context.changeState(self.context.states.trial);
                                deferred.resolve('payment succeeded...moving to trial state.');
                            }
                        });
                    } else {
                        deferred.reject('payment failed...');
                    }
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
        if (company.constructor.name === 'model') {
            this.company = company;
            this.states.pending.initialize(this);
            this.states.trial.initialize(this);
            this.states.awaitingFirstPayment.initialize(this);
            this.state = this.states[company.accountState];
            deferred.resolve('SubscriptionManager is intialized');
        } else {
            deferred.reject('You can only instantiate the subscription manager with a mongoose Company model');
        }
        return deferred.promise;
    },
    verifyCode: function(code){
        return this.state.verifyCode(code);
    },
    runFirstPayment: function(payment){
        return this.state.runFirstPayment(payment);
    },
    changeState: function(state) {
        if(this.state !== state) {
            this.state = state;
        }
    }
};

module.exports = subscriptionManager;