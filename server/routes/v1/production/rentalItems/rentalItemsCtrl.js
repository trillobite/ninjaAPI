var RentalItem = require('mongoose').model('RentalItem');

exports.getRentalItems = function (req, res) {
    RentalItem.find({'meta.company':req.user.meta.company}).exec(function (err, collection) {

        res.send(collection);
    });


};

exports.getRentalItemById = function (req, res) {

    RentalItem.findOne({ _id: req.params.id, 'meta.company':req.user.meta.company }).exec(function (err, rentalItem) {
        res.send(rentalItem);
    });

};

exports.createRentalItem = function (req, res, next) {
    var rentalItemData = req.body;
    console.log(req.body);
    // set the meta company
    rentalItemData.meta = {company: req.user.meta.company};
    RentalItem.create(rentalItemData, function (err, rentalItem) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(rentalItem.toObject());
    });
};

exports.updateRentalItem = function (req, res) {
    delete req.body._id;
    
    RentalItem.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, rentalItem) {
        if (err) {
            console.log(err);
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(rentalItem.toObject());
    });
};

exports.deleteRentalItem = function (req, res) {
    RentalItem.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(204);
    });
};