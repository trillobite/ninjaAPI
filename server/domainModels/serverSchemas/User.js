var userSchema = require ('../schemas/account/UserSchema');

var encrypt = require('../../utilities/encryption');

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
};

//adding security fields here
userSchema.salt = {
    type:String, 
    required:"{PATH} is required!"
}

userSchema.hashed_pwd = {
    type:String, 
    required:"{PATH} is required!"
}

module.exports = userSchema;