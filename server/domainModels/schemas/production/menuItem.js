var mongoose = require('mongoose');
var sharedSchemas = require('../sharedSchemas');

var menuItemSchema = mongoose.Schema({
    meta: sharedSchemas.metaSchema,
    name: String,
    description: String,
    title: String,
    subTitle: String,
    summary: String,
    category: String,
   
    variations: [{name:String,description:String}],
});

module.exports = menuItemSchema;
