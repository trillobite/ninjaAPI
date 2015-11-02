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

exports.verifyCompany = function(req, res, next){
    
    Company.findById({_id: req.params.id}).exec(function(err, company){
        sm.initialize(company).then(function(){
            return sm.verifyCode(req.body.pendingVerificationCode);
        }).then(function(msg){
                res.send({success:true, msg: msg});
            }, function(msg){
                res.send({success: false, msg: msg});
            });
    });
    
};

exports.runFirstPayment = function(req, res, next){
    
    Company.findById({_id: req.params.id}).exec(function(err, company){
        
        sm.initialize(company).then(function(msg){
            console.log(msg);
            return sm.runFirstPayment(req.body.cardInfo);
        }).then(function(msg){
                res.send({success:true, msg: msg});
            }, function(msg){
                res.send({success: false, msg: msg});
            });
    });
    
};

exports.createCompany = function (req, res, next) {
    
    var newCompany = new Company({
                companyName: req.body.companyName,
                emails: [{emailType: "AccountCreator", primary: true, email: req.body.username}],
                accountState: 'pending'
            }
        );
        
        var random = Math.floor(Math.random() * (999999 - 100000) + 100000);
        newCompany.pendingVerificationCode = random;
        // create random number add it to the company document and email to the account creator
        // 
    newCompany.save(function (err) {
        if (err) { console.log(err); }
        console.log("in companies.createCompany new doc id is " + newCompany._id);
        req.body.company = newCompany._id;
        var newAccount = newCompany.toObject();
        delete newAccount.pendingVerificationCode;
        
        var userData = req.body;
        delete userData.companyName;
        userData.company = newCompany._id;
        userData.roles = ['accountCreator', 'admin'];
        userData.username = userData.username.toLowerCase();
        userData.salt = encrypt.createSalt();
        userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
        User.create(userData, function(err, user){
            if(err){
                if(err.toString().indexOf('E11000')>-1){
                err = new Error('Duplicate Username');
                }
                res.status(400);
                return res.send({reason: err.toSTring()});
            }
            
            /// set up email config here
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.email_un,
                pass: config.email_pw
            }
        });
        var mailOptions = {
            from: 'banquet.ninja <banquet.ninja@gmail.com',
            to: 'chris@oldtowndining.com',
            subject: 'account verification',
            text: 'here is your code: ' + random
        };
        
        
        
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
                res.send(newAccount);
            }
        });
            
        });
        
        
        
        
        
    });

    
};

exports.getCompanyById = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        res.send(company);
    });
};

exports.getCompanies = function (req, res) {
    Company.find({}).lean().exec(function (err, collection) {
        res.send(collection);
    });
};

exports.updateCompany = function (req, res) {
    //mongoose does't like the _id in the req.body...causes error
    delete req.body._id;
    Company.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, company) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Company');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(company);
    });

};