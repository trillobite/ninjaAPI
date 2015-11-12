var Company = require('mongoose').model('Company');

var User = require('mongoose').model('User');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../../../config/config')[env];
var nodemailer = require('nodemailer');
var encrypt = require('../../../utilities/encryption');
var cm = require('../../../framework/companyManager');
var sm = require('../../../framework/subscriptionManager');

exports.createNewAccount = function (req, res, next) {
    
    cm.createNewCompany(req.body).then(function(company){
        res.send('success i created a company');
    }, function (err) {
        res.send('i failed to create a company');
    });
    
};