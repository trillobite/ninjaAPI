var mongoose = require('mongoose');

// import schemas
// var companySchema = require('./schemas/account/Company');
// var userSchema = require('./schemas/account/User');
// register the models with the imported schemas
mongoose.model('User', require('./schemas/account/Company').schema);
mongoose.model('Company', require('./schemas/account/User').schema);
// mongoose.model('User', userSchema.schema);
// mongoose.model('Company', companySchema.schema);

exports.seedDb = require('./seedDb');