
var crypto = require('crypto');


exports.createSalt = function () {
    var randomBytes = crypto.randomBytes(128).toString('base64');
    
    return randomBytes;
};

exports.hashPwd = function (salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
};