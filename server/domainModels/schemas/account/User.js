
var mongoose = require('mongoose');
var validate = require('../validators');
var sharedSchemas = require('../sharedSchemas');
var userSchema = new mongoose.Schema({
    meta: sharedSchemas.metaSchema,
    firstName: {type:String, 
            required:"First name is required"
    },
    lastName: {type:String, 
            required:"Last name is required"
    },
    username: {
            type: String,
            required: "A valid email is required",
            unique: true,
            validate: validate.validators.emailValidator
    },
    company: {type:mongoose.Schema.Types.ObjectId,
            required: 'A user must be associated with a company',
            ref:'Company'},
    //adding security fields here
    salt: {type:String, required:"{PATH} is required!"},
    hashed_pwd: {type:String, required:"{PATH} is required!"},
    roles: [{type:String, enum: ['superUser', 'admin', 'gold', 'silver', 'bronze']}]

});




module.exports = userSchema;





