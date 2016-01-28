var mongoose = require('mongoose');
var schemas = require('./schemas');
var serverSchemas = require('./serverSchemas');


mongoose.model('User', serverSchemas.User);
mongoose.model('Company', schemas.account.Company);
mongoose.model('Lookups', schemas.common.Lookups);
mongoose.model('Venue', schemas.events.Venue);
mongoose.model('RentalItem', schemas.events.RentalItem);
mongoose.model('MenuItem', schemas.production.MenuItem);
mongoose.model('Contract', schemas.events.Contract);
mongoose.model('Menu', schemas.production.Menu);
mongoose.model('MenuGroup', schemas.production.MenuGroup);
mongoose.model('Customer', schemas.customer.Customer);



exports.seedDb = require('./seedDb');