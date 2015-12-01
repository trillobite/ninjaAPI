var MenuItem = require('mongoose').model('MenuItem');

exports.getMenuItems = function (req, res) {
    MenuItem.find({'meta.company':req.user.meta.company}).exec(function (err, collection) {

        res.send(collection);
    });


};

exports.getMenuItemById = function (req, res) {

    MenuItem.findOne({ _id: req.params.id, 'meta.company':req.user.meta.company }).exec(function (err, menuitem) {
        res.send(menuitem);
    });

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
    
    MenuItem.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, menuItem) {
        if (err) {
            console.log(err);
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(menuItem.toObject());
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