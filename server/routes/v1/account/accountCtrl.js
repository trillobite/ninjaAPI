var Company = require('mongoose').model('Company');

var User = require('mongoose').model('User');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../../../config/config')[env];
var nodemailer = require('nodemailer');
var encrypt = require('../../../utilities/encryption');
var companyManager = require('../../../framework/companyManager');
var subscriptionManager = require('../../../framework/subscriptionManager');

exports.createNewAccount = function (req, res, next) {
    
    // here we create a new company which also creates a new admin user
    // a company is useless without an admin user which is why we do it that way
    // promise is retured and if sucessful we pass the created company mongoose object
    // to the subscription manager.  I think we could de-promisify the intialize function
    // as it is not asynchronous.  Should just return itself so we can then dot into 
    // runFirstPayment.  runFirstPayment if successful is the end of the workflow.
    
    companyManager.createNewCompany(req.body).then(function(company){
        subscriptionManager.initialize(company).then(function(){
            subscriptionManager.runFirstPayment(req.body).then(function(){
                res.send('success i created a company');
            },function(){
                res.send('i failed to process a payment');
            });
        },function(){
            res.send('i failed to initialize the subscription manger');
        })
        
        
    }, function (err) {
        res.send('i failed to create a company');
    });
    
};
