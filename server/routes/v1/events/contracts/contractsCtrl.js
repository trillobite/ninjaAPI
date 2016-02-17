var Customer = require('mongoose').model('Customer');


exports.createContract = function (req, res, model) {
    var modelItemData = req.body;
    // set the meta company
    modelItemData.meta = {company: req.user.meta.company};
    model.create(modelItemData, function (err, modelItem) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        Customer.findByIdAndUpdate(modelItem.customer, 
        {$push: {contracts: modelItem._id}},
        {safe: true, upsert: true}, function(err, customer){
            if(err){
                res.status(400);
                return res.send({reason: err.toString(), appMessage: "Problem updating customer.contracts array"})
            }
            
            res.send({data: modelItem.toObject()});
        })
    });
};