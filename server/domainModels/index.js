var mongoose = require('mongoose');


mongoose.model('User', require('./serverSchemas/User'));
mongoose.model('Company', require('./schemas/account/CompanySchema'));
mongoose.model('Lookups', require('./schemas/account/LookupsSchema'));
mongoose.model('Venue', require('./schemas/production/VenueSchema'));
mongoose.model('RentalItem', require('./schemas/production/RentalItemSchema'));
mongoose.model('MenuItem', require('./schemas/production/MenuItemSchema'));
mongoose.model('Contract', require('./schemas/production/ContractSchema'));
mongoose.model('Menu', require('./schemas/production/MenuSchema'));
mongoose.model('MenuGroup', require('./schemas/production/MenuGroup'));
mongoose.model('Customer', require('./schemas/customer/CustomerSchema'));


exports.seedDb = require('./seedDb');