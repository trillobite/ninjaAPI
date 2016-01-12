var Lookups = require('mongoose').model('Lookups');
var utilities = require('../../utilities');

exports.getLookups = function (req, res) {
    Lookups.findOne({'meta.company':req.user.meta.company}).exec(function(err, collection){
        utilities.getItemCallback(err, collection, res);
    });

};