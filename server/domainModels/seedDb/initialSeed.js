var Q = require('q');
var Company = require('mongoose').model('Company');
var seedDb = require('./index');

var initialSeed = function (){
	Company.find({}).exec(function (err, collection){
		if (collection.length === 0) {
			seedDb.createDefaultCompany().then(function(companyId){
				seedDb.createSeedDB(companyId);
			});
		}
	})
};

module.exports = initialSeed;