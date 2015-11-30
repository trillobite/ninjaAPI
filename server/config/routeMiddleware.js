
var jwt = require('jsonwebtoken');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

module.exports = function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function(err, userDecoded){
            if(err){
                return res.json({success:false, message: 'Failed to authenticate token.'});
            } else {
                req.user = userDecoded;
                
                next();
            }
        });
    } else {
        return res.status(401).send({success: false, message: 'No token provided'});
    }

};