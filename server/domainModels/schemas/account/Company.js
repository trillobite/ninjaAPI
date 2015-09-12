var mongoose = require('mongoose');
var validate = require('../validators');

var companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: "{PATH} is required.",
        unique: true
    },
    addresses: [{
        addressType: String,
        primary: Boolean,
        address1: String,
        address2: String,
        city: String,
        state: { type: String, enum: validate.validators.stateCodes },
        zip: { type: String, validate: validate.validators.zipCodeValidator }
    }],
    emails: [{
        emailType: String,
        primary: Boolean,
        email: { type: String, validate: validate.validators.emailValidator }
    }],
    contactNumbers: [{
        primary: Boolean,
        contactType: String,
        number: { type: String }
    }],
    dueCurrent: Boolean,
    accountLockout: Boolean
});

companySchema.methods = {
    isDuesCurrent: function () {return this.duesCurrent;},
    isAccountLockout: function () {return this.accountLockout;}
};
exports.schema = companySchema;



