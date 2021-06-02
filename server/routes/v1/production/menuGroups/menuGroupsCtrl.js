var MenuGroup = require('mongoose').model('MenuGroup');

exports.getMenuGroups = function (req, res) {
    MenuGroup.find({'meta.company':req.user.meta.company}).exec(function (err, collection) {

        res.send({data: collection});
    });


};
