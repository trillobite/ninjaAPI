var Company = require('mongoose').model('Company');
var q = require('q');

module.exports = {
    company: undefined,
    state: undefined,
    states: {
        pending: {
            initialize: function(target){
                this.target = target;
            },
            verifyCode: function (code) {
                var deferred = q.defer();
                var Company = this.target.company;
                if (Company.pendingVerificationCode == code){
                    Company.accountState = 'trial';
                    this.target.changeState(this.target.states.trial);
                    Company.save(function(err){
                        
                        deferred.resolve();
                    });
                }
                
                
                return deferred.promise;
            },
            submitPayment: function(payment) {
                console.log('cant accept the payment yet');
            }
        },
        trial: {
            initialize: function(target){
                this.target = target;
            },
            verifyCode: function (code) {
                console.log('already verified');
            },
            submitPayment: function(payment) {
                console.log('submitting payment');
                
                this.target.changeState(this.target.states.current);
            }
        },
        current: {
            initialize: function(target){
                this.target = target;
            },
            verifyCode: function (code) {
                console.log('already verified');
            },
            submitPayment: function(payment) {
                console.log('payment has been submitted');
                console.log(payment);
            }
        }
    },
    initialize: function(companyId) {
        var self = this;
        var deferred = q.defer();
        
        Company.findById({_id: companyId}).exec(function(err, company){
            
            self.company = company;
            self.states.pending.initialize(self);
            self.states.trial.initialize(self);
            self.states.current.initialize(self);
            self.state = self.states[company.accountState];
            deferred.resolve();
            
        });
        
        return deferred.promise;
        
    },
    verifyCode: function(code){
        this.state.verifyCode(code);
    },
    submitPayment: function(payment){
        this.state.submitPayment(payment);
    },
    changeState: function(state) {
        if(this.state !== state) {
            this.state = state;
        }
    }
};