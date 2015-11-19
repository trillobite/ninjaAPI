var userSchema = require ('../schemas/account/User');

var encrypt = require('../../utilities/encryption');

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
};

module.exports = userSchema;