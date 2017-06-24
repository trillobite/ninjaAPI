'use strict';

var User = require('mongoose').model('User');
var encrypt = require('../../../utilities/encryption');
var utilities = require('../../utilities');

exports.getUsers = function(req, res){
    console.log(req.user.meta.company);
    User.find({'meta.company':req.user.meta.company}).select('firstName lastName username company roles').exec(function(err, collection){
        utilities.getCollectionCallback(err,collection,res);
    });

};

exports.getUserById = function(req, res){
    User.findOne({_id: req.params.id, 'meta.company':req.user.meta.company}).select('firstName lastName username company roles').exec(function(err, item){
        utilities.getItemCallback(err, item, res);
    })
};

exports.userExists = function(req,res){
    User.findOne({username: req.params.username}).exec(function(err,item){
        if(err){
            res.sendStatus(500).send({err:err, message:"something bad happened"});
        }
        if(item){
            res.sendStatus(204);
        } else {
            res.sendStatus(200);
        }
    });
};

exports.createUser = function(req, res, next){
    var userData = req.body;
    // temp fix for now
    userData.meta.company = req.user.company;
    console.log(userData);
    if (req.body.password.length < 8){
        console.log('password is too short');
    }
    
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    User.create(userData, function(err, user){
        if(err){
            console.log(`this is the error:${err}`);
            if(err.toString().indexOf('E11000')>-1){
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        var newUser = user.toObject();
        console.log(newUser);
        delete newUser.salt;
        delete newUser.hashed_pwd;
        if(req.baseUrl === "/api/v1/users"){
            res.send(newUser);
        } else {
            req.login(user, function (err) {            
                if (err) { return next(err); }
                res.send(newUser);
            });
        }
    });

};

exports.updateUser = function(req, res){
    // temp fix
    req.user.hasRole = function (role) {
        return this.roles.indexOf(role) > -1;
    }
    
    var userUpdates = req.body;
    // this makes sure that the user making the request matches the user to update and that the user has the role of admin
    if(req.user._id != userUpdates._id && !req.user.hasRole('admin')){
        res.status(403);
        return res.end();
    }
    // req.user.firstName = userUpdates.firstName;
    // req.user.lastName = userUpdates.lastName;
    // req.user.username = userUpdates.username;
    // if(userUpdates.password && userUpdates.password.length > 0){

    //     req.user.salt = encrypt.createSalt();
    //     req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
    // }
    
    User.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true},function (err,user) {
        if (err) {
            console.log(err.toString());
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        //gotta turn req.user to an object to delete the sensitive info
        user = user.toObject();
        delete user.salt;
        delete user.hashed_pwd;
        
        res.send({data: user});
    });
    



};

