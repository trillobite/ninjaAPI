var mongoose = require('mongoose');
var sharedSchema = require('../sharedSchemas');

var menuGroupSchema = mongoose.Schema({
    meta: sharedSchema.metaSchema,
    name: String,
    description: String,
    title: String,
    subtitle: String,
    summary: String,
    menus: [ {
        menuId: mongoose.Schema.Types.ObjectId,
        title: String,
        subtitle: String
    }  ]
        
});

module.exports = menuGroupSchema;
