var mongoose = require('mongoose');

// import schemas
//var companySchema = require('./schemas/account/Company');
//var userSchema = require('./schemas/account/User');
// register the models with the imported schemas
mongoose.model('User', require('./schemas/account/User'));
mongoose.model('Company', require('./schemas/account/Company'));
// mongoose.model('User', userSchema.schema);
// mongoose.model('Company', companySchema.schema);

exports.seedDb = require('./seedDb');