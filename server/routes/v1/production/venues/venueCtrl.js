var Venue = require('mongoose').model('Venue');

exports.getVenues = function (req, res) {
    Venue.find({'meta.company':req.user.meta.company}).exec(function (err, collection) {

        res.send(collection);
    });


};

exports.getVenueById = function (req, res) {

    Venue.findOne({ _id: req.params.id, 'meta.company':req.user.meta.company }).exec(function (err, venue) {
        res.send(venue);
    });

};

exports.createVenue = function (req, res, next) {
    var venueData = req.body;
    console.log(req.body);
    // set the meta company
    venueData.meta = {company: req.user.meta.company};
    Venue.create(venueData, function (err, venue) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(venue.toObject());
    });
};

exports.updateVenue = function (req, res) {
    delete req.body._id;
    
    Venue.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, venue) {
        if (err) {
            console.log(err);
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(venue.toObject());
    });
};

exports.deleteVenue = function (req, res) {
    Venue.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(204);
    });
};