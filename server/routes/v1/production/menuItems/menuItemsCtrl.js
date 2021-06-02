var MenuItem = require('mongoose').model('MenuItem');
var utilities = require('../../../utilities');

exports.getMenuItems = function (req, res) {
    MenuItem.find({'meta.company':req.user.meta.company}).exec(function(err, collection){
        utilities.getCollectionCallback(err, collection, res);
    });

};

exports.getMenuItemById = function (req, res) {

    MenuItem.findOne({ _id: req.params.id, 'meta.company':req.user.meta.company }).exec(
        function(err, object){
            utilities.getItemCallback(err, object, res);
        }
    );
    
};

exports.createMenuItem = function (req, res, next) {
    var menuItemData = req.body;
    // set the meta company
    menuItemData.meta = {company: req.user.meta.company};
    MenuItem.create(menuItemData, function (err, menuItem) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(menuItem.toObject());
    });
};

exports.updateMenuItem = function (req, res) {
    delete req.body._id;
    
    MenuItem.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true}, function (err, menuItem) {
        if (err) {
            console.log(err);
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send({data: menuItem.toObject()});
    });
};

exports.deleteMenuItem = function (req, res) {
    MenuItem.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(204);
    });
};