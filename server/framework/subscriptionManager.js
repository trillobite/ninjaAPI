var q = require('q');

module.exports = {
    company: undefined,
    state: undefined,
    initialize: function(companyId, dataSource) {
        var self = this;
        self.DataSource = dataSource;
        var deferred = q.defer();
        
        self.DataSource.findById({_id: companyId}).exec(function(err, company){
            if (err) {
                deferred.reject(new Error(err))
            }
            self.company = company;
            self.states.pending.initialize(self);
            self.states.trial.initialize(self);
            self.states.current.initialize(self);
            
            self.state = self.states[company.accountState];
            deferred.resolve();
            
        });
        
        return deferred.promise;
        
    },
    
    // methods that get delegated to the current state
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
    },
    // each state implements the interface above
    states: {
        pending: {
            // submit verfication code
            // submit credit card
            // submit card deline
            // create recurring subscription
            // submit cancellation
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
    }
};