var mongoose = require('mongoose');
var sharedSchema = require('../sharedSchemas');

var menuItemPriceSchema = new mongoose.Schema({
    price: {type:Number, default: 0},
    priceFor: String
});

var menuItemSchema = new mongoose.Schema({
        menuItemId: mongoose.Schema.Types.ObjectId,
        name: {type: String, required: "{PATH} is required."},
        description: String,
        prices: [menuItemPriceSchema]
});

var menuSectionSchema = new mongoose.Schema({
        title: {type: String, required: "{PATH} is required."},
        subtitle: String,
        items: [menuItemSchema],
        footer: String
});


var menuSchema = new mongoose.Schema({
        
        meta: sharedSchema.metaSchema,
        name: String,
        description: String,
        title: {type: String, required: "{PATH} is required."},
        subtitle: String,
        summary: String,
        sections: [menuSectionSchema],
        footer: String
});

module.exports = menuSchema;