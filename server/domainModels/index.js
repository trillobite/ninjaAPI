var mongoose = require('mongoose');

// import schemas
//var companySchema = require('./schemas/account/Company');
//var userSchema = require('./schemas/account/User');
// register the models with the imported schemas
mongoose.model('User', require('./serverSchemas/User'));
mongoose.model('Company', require('./schemas/account/Company'));
mongoose.model('Lookups', require('./schemas/common/Lookups'));
// mongoose.model('User', userSchema.schema);
// mongoose.model('Company', companySchema.schema);
mongoose.model('Menu', require('./schemas/production/Menu'));
mongoose.model('Venue', require('./schemas/events/venueSchema'));
mongoose.model('RentalItem', require('./schemas/events/rentalItemSchema'));
mongoose.model('MenuItem', require('./schemas/production/MenuItem'));
mongoose.model('MenuGroup', require('./schemas/production/MenuGroup'));

exports.seedDb = require('./seedDb');