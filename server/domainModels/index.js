var mongoose = require('mongoose');
var schemas = require('./schemas');

mongoose.model('User', schemas.account.User);
mongoose.model('Company', schemas.account.Company);
mongoose.model('Lookups', schemas.common.Lookups);
mongoose.model('Venue', schemas.events.Venue);
mongoose.model('RentalItem', schemas.events.RentalItem);
mongoose.model('MenuItem', schemas.production.MenuItem);
mongoose.model('Contract', schemas.events.Contract);
mongoose.model('Menu', schemas.production.Menu);
mongoose.model('MenuGroup', schemas.production.MenuGroup);
mongoose.model('Customer', schemas.customer.Customer);

<<<<<<< HEAD
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
=======
>>>>>>> 5bc7621fce8fd476e3116e1549c52f912c9ad3c1

exports.seedDb = require('./seedDb');